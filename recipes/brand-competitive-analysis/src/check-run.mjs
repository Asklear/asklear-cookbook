#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";

const manifestPath = resolve(process.argv[2] ?? "example/run.json");

function fail(message) {
  console.error(`Invalid run: ${message}`);
  process.exitCode = 1;
}

function requireString(value, path) {
  if (typeof value !== "string" || value.trim() === "") fail(`${path} is required`);
}

let run;
try {
  run = JSON.parse(await readFile(manifestPath, "utf8"));
} catch (error) {
  console.error(`Cannot read ${manifestPath}: ${error.message}`);
  process.exit(1);
}

requireString(run.recipe_id, "recipe_id");
requireString(run.executed_at, "executed_at");
requireString(run.input?.brand, "input.brand");
requireString(run.scope?.actual_period, "scope.actual_period");
requireString(run.scope?.data_through, "scope.data_through");

for (const key of ["entity_alignment", "evidence", "findings", "limitations", "deliverables"]) {
  if (!Array.isArray(run[key]) || run[key].length === 0) fail(`${key} must be a non-empty array`);
}

const evidenceIds = new Set();
for (const [index, item] of (run.evidence ?? []).entries()) {
  requireString(item.id, `evidence[${index}].id`);
  requireString(item.source, `evidence[${index}].source`);
  requireString(item.scope, `evidence[${index}].scope`);
  if (evidenceIds.has(item.id)) fail(`duplicate evidence id ${item.id}`);
  evidenceIds.add(item.id);
}

const findingIds = new Set();
for (const [index, finding] of (run.findings ?? []).entries()) {
  requireString(finding.id, `findings[${index}].id`);
  requireString(finding.statement, `findings[${index}].statement`);
  if (findingIds.has(finding.id)) fail(`duplicate finding id ${finding.id}`);
  findingIds.add(finding.id);
  if (!Array.isArray(finding.evidence_ids) || finding.evidence_ids.length === 0) {
    fail(`findings[${index}].evidence_ids must be non-empty`);
    continue;
  }
  for (const id of finding.evidence_ids) {
    if (!evidenceIds.has(id)) fail(`finding ${finding.id} references unknown evidence ${id}`);
  }
}

if (!Array.isArray(run.report_claims) || run.report_claims.length === 0) {
  fail("report_claims must be a non-empty array");
} else {
  for (const [index, claim] of run.report_claims.entries()) {
    requireString(claim.location, `report_claims[${index}].location`);
    if (!Array.isArray(claim.finding_ids) || claim.finding_ids.length === 0) {
      fail(`report_claims[${index}].finding_ids must be non-empty`);
      continue;
    }
    for (const id of claim.finding_ids) {
      if (!findingIds.has(id)) fail(`report claim references unknown finding ${id}`);
    }
  }
}

for (const [index, item] of (run.entity_alignment ?? []).entries()) {
  requireString(item.dataset, `entity_alignment[${index}].dataset`);
  if (!Array.isArray(item.brand_values) || item.brand_values.length === 0) {
    fail(`entity_alignment[${index}].brand_values must be non-empty`);
  }
}

for (const [index, relativePath] of (run.deliverables ?? []).entries()) {
  requireString(relativePath, `deliverables[${index}]`);
  if (typeof relativePath !== "string" || relativePath.trim() === "") continue;
  try {
    const artifactPath = resolve(dirname(manifestPath), relativePath);
    await access(artifactPath, constants.R_OK);
    const expectedHash = run.artifact_hashes?.[relativePath];
    requireString(expectedHash, `artifact_hashes.${relativePath}`);
    if (typeof expectedHash === "string" && expectedHash.startsWith("sha256:")) {
      const actualHash = createHash("sha256").update(await readFile(artifactPath)).digest("hex");
      if (expectedHash !== `sha256:${actualHash}`) fail(`artifact hash mismatch: ${relativePath}`);
    } else {
      fail(`artifact hash must use sha256: ${relativePath}`);
    }
  } catch {
    fail(`deliverable is missing: ${relativePath}`);
  }
}

if (!process.exitCode) {
  console.log(`Valid run: ${run.findings.length} findings, ${run.evidence.length} evidence items, ${run.deliverables.length} deliverables.`);
}
