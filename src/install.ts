import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";
import { getPmCommand } from "./pm";
import { ref } from "process";

export async function installGroup(group: string, pm = "bun") {
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
    console.warn(`⚠️ No dependencies found in "${sectionName}"`);
    return;
  }

  const packages = Object.entries(deps).map(([name, version]) => {
    // Handle referenced packages like "dependencies:dotenv"
    if (typeof version === 'string' && version.includes(':')) {
      const [refSection, refPackage] = version.split(':');

      if (!refSection || !refPackage) {
        console.warn(`⚠️ Invalid reference format for "${name}": "${version}"`);
        return null;
      }

      if (!pkg[refSection]) {
        console.warn(`⚠️ Reference section "${refSection}" not found in package.json`);
        return null;
      }

      const refDeps = pkg[refSection];
      if (refDeps && refDeps[refPackage]) {
        return `${name}@${refDeps[refPackage]}`;
      } else {
        console.warn(`⚠️ Referenced package "${refPackage}" not found in section "${refSection}"`);
        return null;
      }
    }

    return `${name}@${version}`;
  }).filter(Boolean) as string[];

  const cmd = getPmCommand(pm, packages);

  console.log(`📦 Installing ${sectionName} using ${pm}`);
  console.log(`> ${cmd}`);

  execSync(cmd, { stdio: "inherit" });
}
