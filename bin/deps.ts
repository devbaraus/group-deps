#!/usr/bin/env bun
import { installGroup } from "../src/install";
import { addToGroup } from "../src/add";
import { removeFromGroup } from "../src/remove";

const args = process.argv.slice(2);
const command = args[0];

if (!command || !["install", "add", "remove"].includes(command)) {
  console.log("Usage:");
  console.log("  deps install <group> [--pm <bun|npm|pnpm|yarn>] [--pkg <path>]");
  console.log("  deps add <group> <package> [<package>...] [--pkg <path>]");
  console.log("  deps remove <group> <package> [<package>...] [--pkg <path>]");
  process.exit(1);
}

const group = args[1];

if (!group) {
  console.error("❌ Missing group name");
  process.exit(1);
}

const getFlagValue = (flag: string) => {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : undefined;
};

const pkgPath = getFlagValue("--pkg");

const optionFlags = new Set(["--pm", "--pkg"]);
const cleanedArgs = args.slice(2).filter((arg, index, arr) => {
  if (optionFlags.has(arg)) return false;
  if (index > 0 && optionFlags.has(arr[index - 1])) return false;
  return true;
});

if (command === "install") {
  let pm = "bun";
  const pmIndex = args.indexOf("--pm");
  if (pmIndex !== -1) {
    pm = args[pmIndex + 1];
  }

  await installGroup(group, pm, pkgPath);
} else if (command === "add") {
  const packages = cleanedArgs;
  if (packages.length === 0) {
    console.error("❌ No packages specified");
    process.exit(1);
  }

  await addToGroup(group, packages, pkgPath);
} else if (command === "remove") {
  const packages = cleanedArgs;
  if (packages.length === 0) {
    console.error("❌ No packages specified");
    process.exit(1);
  }

  await removeFromGroup(group, packages, pkgPath);
}
