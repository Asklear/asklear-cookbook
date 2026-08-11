#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const recipesRoot = join(root, "recipes");
const checkPublished = process.argv.includes("--published");
const errors = [];

async function exists(path) {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function checkLocalLinks(markdownPath, label) {
  const markdown = await readFile(markdownPath, "utf8");
  for (const match of markdown.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    const resolvedTarget = resolve(dirname(markdownPath), decodeURIComponent(target));
    if (!(await exists(resolvedTarget))) errors.push(`${label}: broken local link ${target}`);
  }
}

for (const entry of await readdir(recipesRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
  const recipeDir = join(recipesRoot, entry.name);
  const yamlPath = join(recipeDir, "recipe.yaml");
  if (!(await exists(yamlPath))) continue;

  const yaml = await readFile(yamlPath, "utf8");
  const status = yaml.match(/^status:\s*(\S+)/m)?.[1];
  const outputBlock = yaml.match(/^outputs:\s*\n((?:\s{2}-\s+\S+\s*\n?)*)/m)?.[1] ?? "";
  const outputs = [...outputBlock.matchAll(/^\s{2}-\s+(\S+)/gm)].map((match) => match[1]);
  const required = ["README.md", "workflow.md", "recipe.yaml", "src", "example"];
  for (const name of required) {
    if (!(await exists(join(recipeDir, name)))) errors.push(`${entry.name}: missing ${name}`);
  }
  await checkLocalLinks(join(recipeDir, "README.md"), `${entry.name}/README.md`);
  const exampleReadme = join(recipeDir, "example", "README.md");
  if (await exists(exampleReadme)) await checkLocalLinks(exampleReadme, `${entry.name}/example/README.md`);

  if (status !== "verified") continue;
  const readme = await readFile(join(recipeDir, "README.md"), "utf8");
  const expectedUrl = `https://raw.githubusercontent.com/Asklear/asklear-cookbook/main/recipes/${entry.name}/workflow.md`;
  if (!readme.includes(expectedUrl)) errors.push(`${entry.name}: public workflow URL is missing or incorrect`);

  for (const output of outputs) {
    if (!(await exists(join(recipeDir, "example", `report.${output}`)))) {
      errors.push(`${entry.name}: verified output is missing: example/report.${output}`);
    }
  }

  if (checkPublished) {
    try {
      const response = await fetch(expectedUrl, { cache: "no-store" });
      if (!response.ok) {
        errors.push(`${entry.name}: published workflow returned ${response.status}`);
      } else {
        const [published, local] = await Promise.all([
          response.text(),
          readFile(join(recipeDir, "workflow.md"), "utf8")
        ]);
        if (published.trim() !== local.trim()) errors.push(`${entry.name}: published workflow differs from local`);
      }
    } catch (error) {
      errors.push(`${entry.name}: cannot check published workflow: ${error.message}`);
    }
  }
}

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exit(1);
}

console.log(`Recipe checks passed${checkPublished ? " including published workflows" : ""}.`);
