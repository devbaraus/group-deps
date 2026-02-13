export function getPmCommand(pm: string, packages: string[]): string {
  const list = packages.join(" ");

  switch (pm) {
    case "bun":
      return `bun add ${list}`;
    case "pnpm":
      return `pnpm add ${list}`;
    case "yarn":
      return `yarn add ${list}`;
    case "npm":
    default:
      return `npm install ${list}`;
  }
}
