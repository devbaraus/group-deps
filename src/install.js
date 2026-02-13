import { readFileSync } from "fs";
import { execSync } from "child_process";
import { resolve } from "path";
import { getPmCommand } from "./pm.js";

export function installGroup(group, options = {}) {
  const pm = options.pm || "npm";
  const pkgPath = resolve(process.cwd(), "package.json");

  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

  const sectionName =
    group === "deps"
      ? "dependencies"
      : group === "dev"
      ? "devDependencies"
      : `${group}Dependencies`;

  const deps = pkg[sectionName];

  if (!deps || Object.keys(deps).length === 0) {
    console.log(`⚠️ No dependencies found in "${sectionName}"`);
    return;
  }

  const packages = Object.entries(deps).map(
    ([name, version]) => `${name}@${version}`
  );

  const cmd = getPmCommand(pm, packages);

  console.log(`📦 Installing ${sectionName} using ${pm}`);
  console.log(`> ${cmd}`);

  execSync(cmd, { stdio: "inherit" });
}
