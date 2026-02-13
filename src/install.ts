import { readFileSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";
import { getPmCommand } from "./pm";

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
