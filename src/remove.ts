import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export async function removeFromGroup(
  group: string,
  packages: string[],
  pkgPath?: string
) {
  const resolvedPkgPath = pkgPath
    ? resolve(process.cwd(), pkgPath)
    : resolve(process.cwd(), "package.json");
  const pkg = JSON.parse(readFileSync(resolvedPkgPath, "utf8"));

  const sectionName =
    group === "deps"
      ? "dependencies"
      : group === "dev"
      ? "devDependencies"
      : `${group}Dependencies`;

  if (!pkg[sectionName]) {
    console.log(`⚠️ Section "${sectionName}" not found`);
    return;
  }

  for (const pkgName of packages) {
    if (pkg[sectionName][pkgName]) {
      delete pkg[sectionName][pkgName];
      console.log(`✅ Removed ${pkgName} from ${sectionName}`);
    } else {
      console.log(`⚠️ ${pkgName} not found in ${sectionName}`);
    }
  }

  writeFileSync(resolvedPkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log(`📝 Updated package.json`);
}
