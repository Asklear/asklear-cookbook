#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";

function stop(message) {
  console.error(`Invalid package: ${message}`);
  process.exitCode = 1;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function ids(items, label) {
  if (!Array.isArray(items) || items.length === 0) {
    stop(`${label} must be a non-empty array`);
    return new Set();
  }
  const result = new Set();
  for (const [index, item] of items.entries()) {
    if (typeof item?.id !== "string" || item.id === "") stop(`${label}[${index}].id is required`);
    if (result.has(item?.id)) stop(`duplicate ${label} id ${item.id}`);
    result.add(item?.id);
  }
  return result;
}

const dataPath = resolve(process.argv[2] ?? "example/data.json");
const reviewPath = resolve(process.argv[3] ?? "example/review.json");
const manifestPath = resolve(process.argv[4] ?? "example/run.json");
let data;
let review;
let manifest;
try {
  [data, review, manifest] = await Promise.all([readJson(dataPath), readJson(reviewPath), readJson(manifestPath)]);
} catch (error) {
  console.error(`Cannot read package: ${error.message}`);
  process.exit(1);
}

if (manifest.recipe_id !== "emerging-market-validation") stop("run.json has the wrong recipe_id");
if (review.articleId !== data.articleId) stop("review and data article IDs differ");
if (review.dataHash !== `sha256:${sha256(stableJson(data))}`) stop("review dataHash does not match data.json");

if (!data.resolvedScope?.startDate || !data.resolvedScope?.endDate) stop("resolvedScope dates are required");
const queryIds = ids(data.queries, "queries");
const factIds = ids(data.facts, "facts");
const factsById = new Map((data.facts ?? []).map((fact) => [fact.id, fact]));
const assessmentIds = ids(data.comparabilityAssessments, "comparabilityAssessments");
ids(data.findings, "findings");

for (const fact of data.facts ?? []) {
  for (const source of fact.sources ?? []) {
    if (!queryIds.has(source.queryId)) stop(`fact ${fact.id} references unknown query ${source.queryId}`);
  }
  for (const inputId of fact.derivation?.inputFactIds ?? []) {
    if (!factIds.has(inputId)) stop(`fact ${fact.id} derives from unknown fact ${inputId}`);
  }
  if (!(fact.sources?.length || fact.derivation?.inputFactIds?.length)) {
    stop(`fact ${fact.id} has no source or derivation`);
  }
}

function recomputeFact(factId, visiting = new Set()) {
  const fact = factsById.get(factId);
  if (!fact?.derivation) return fact?.value;
  if (visiting.has(factId)) throw new Error(`derivation cycle at ${factId}`);
  visiting.add(factId);
  let expression = fact.derivation.formula;
  const inputIds = [...fact.derivation.inputFactIds].sort((a, b) => b.length - a.length);
  for (const inputId of inputIds) {
    expression = expression.split(inputId).join(String(recomputeFact(inputId, visiting)));
  }
  visiting.delete(factId);
  if (!/^[0-9eE+*/().\-\s]+$/.test(expression)) throw new Error(`unsupported formula for ${factId}`);
  const result = Function(`"use strict"; return (${expression});`)();
  if (!Number.isFinite(result)) throw new Error(`non-finite derivation for ${factId}`);
  return result;
}

for (const fact of data.facts ?? []) {
  if (!fact.derivation) continue;
  try {
    const recomputed = recomputeFact(fact.id);
    const tolerance = Math.max(1, Math.abs(fact.value)) * 1e-10;
    if (Math.abs(recomputed - fact.value) > tolerance) stop(`derived value mismatch: ${fact.id}`);
  } catch (error) {
    stop(error.message);
  }
}

const requiredReviewFacts = new Set();
for (const finding of data.findings ?? []) {
  if (!Array.isArray(finding.factIds) || finding.factIds.length === 0) stop(`finding ${finding.id} has no facts`);
  for (const factId of finding.factIds ?? []) {
    if (!factIds.has(factId)) stop(`finding ${finding.id} references unknown fact ${factId}`);
    requiredReviewFacts.add(factId);
  }
  if (finding.comparabilityAssessmentId && !assessmentIds.has(finding.comparabilityAssessmentId)) {
    stop(`finding ${finding.id} references unknown comparability assessment`);
  }
}

if (review.passed !== true) stop("review did not pass");
const verifiedFacts = new Set(review.verifiedFactIds ?? []);
for (const factId of requiredReviewFacts) {
  if (!verifiedFacts.has(factId)) stop(`finding fact was not independently verified: ${factId}`);
}

for (const queryId of review.rerunQueryIds ?? []) {
  if (!queryIds.has(queryId)) stop(`review references unknown rerun query: ${queryId}`);
}

const packageDir = dirname(dataPath);
for (const [filename, expectedHash] of Object.entries(manifest.artifacts ?? {})) {
  try {
    const artifactPath = resolve(packageDir, filename);
    await access(artifactPath, constants.R_OK);
    const actualHash = sha256(await readFile(artifactPath));
    if (expectedHash !== `sha256:${actualHash}`) stop(`artifact hash mismatch: ${filename}`);
  } catch {
    stop(`deliverable is missing: ${filename}`);
  }
}

if (review.contentHash !== manifest.artifacts?.["reviewed-research.md"]) {
  stop("review contentHash does not match reviewed-research.md");
}

if (!process.exitCode) {
  console.log(`Valid package: ${data.queries.length} queries, ${data.facts.length} facts, ${data.findings.length} findings.`);
}
