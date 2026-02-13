import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export async function addToGroup(
  group: string,
  packages: string[]
) {
  const pkgPath = resolve(process.cwd(), "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

  const sectionName =
    group === "deps"
      ? "dependencies"
      : group === "dev"
      ? "devDependencies"
      : `${group}Dependencies`;

  // Initialize section if it doesn't exist
  if (!pkg[sectionName]) {
    pkg[sectionName] = {};
  }

  for (const pkgSpec of packages) {
    const [name, version] = pkgSpec.includes("@") && !pkgSpec.startsWith("@")
      ? pkgSpec.split("@")
      : [pkgSpec, "latest"];

    pkg[sectionName][name] = version;
    console.log(`✅ Added ${name}@${version} to ${sectionName}`);
  }

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log(`📝 Updated package.json`);
}
