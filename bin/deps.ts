#!/usr/bin/env bun
import { installGroup } from "../src/install";

const args = process.argv.slice(2);

if (args[0] !== "install") {
  console.log("Usage: deps install <group> --pm <bun|npm|pnpm|yarn>");
  process.exit(1);
}

const group = args[1];

let pm = "bun";

const pmIndex = args.indexOf("--pm");
if (pmIndex !== -1) {
  pm = args[pmIndex + 1];
}

if (!group) {
  console.error("❌ Missing group name");
  process.exit(1);
}

await installGroup(group, pm);
