#!/usr/bin/env bun
import { installGroup } from "../src/install";
import { addToGroup } from "../src/add";
import { removeFromGroup } from "../src/remove";

const args = process.argv.slice(2);
const command = args[0];

if (!command || !["install", "add", "remove"].includes(command)) {
  console.log("Usage:");
  console.log("  deps install <group> [--pm <bun|npm|pnpm|yarn>]");
  console.log("  deps add <group> <package> [<package>...]");
  console.log("  deps remove <group> <package> [<package>...]");
  process.exit(1);
}

const group = args[1];

if (!group) {
  console.error("❌ Missing group name");
  process.exit(1);
}

if (command === "install") {
  let pm = "bun";
  const pmIndex = args.indexOf("--pm");
  if (pmIndex !== -1) {
    pm = args[pmIndex + 1];
  }

  await installGroup(group, pm);
} else if (command === "add") {
  const packages = args.slice(2);
  if (packages.length === 0) {
    console.error("❌ No packages specified");
    process.exit(1);
  }

  await addToGroup(group, packages);
} else if (command === "remove") {
  const packages = args.slice(2);
  if (packages.length === 0) {
    console.error("❌ No packages specified");
    process.exit(1);
  }

  await removeFromGroup(group, packages);
}
