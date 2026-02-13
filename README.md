# Group Deps

Selectively install dependency groups from your `package.json`. Perfect for monorepos and projects with custom dependency categories where you only need to install specific groups without installing everything.

## Installation

To install the tool, run:

```bash
npm jsr add -g @zerun/group-deps
```

``` bash
bunx jsr add @zerun/group-deps
```

## Setup

### Custom Dependency Groups

Add custom dependency groups to your `package.json`:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@biomejs/biome": "^1.0.0"
  },
  "cronDependencies": {
    "croner": "^10.0.1"
  }
}
```

### Referenced Packages

You can reference versions from other dependency sections instead of duplicating version numbers:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "dotenv": "^16.0.0"
  },
  "buildDependencies": {
    "croner": "^10.0.1",
    "dotenv": "dependencies:dotenv",
    "biome": "devDependencies:@biomejs/biome"
  },
  "devDependencies": {
    "@biomejs/biome": "^2.3.15"
  }
}
```

When you reference a package like `"react": "dependencies:react"`, the tool will resolve the actual version from the `dependencies` section.

### Custom Package.json

If you have a monorepo or want to manage dependencies in a specific package, you can specify a custom `package.json` path:

```bash
deps install cron --pkg ./apps/foo/package.json
```

## Commands

### install

Install specific dependency groups from your `package.json`:

```bash
deps install <group> [--pm <package-manager>] [--pkg <path>]
```

**Parameters:**

- `<group>`: The dependency group to install (`deps` for dependencies, `dev` for devDependencies, or any custom group suffix like `cron` for cronDependencies)
- `--pm`: Package manager to use (`bun`, `npm`, `pnpm`, `yarn`). Defaults to `bun`
- `--pkg`: Path to a custom package.json (defaults to `./package.json`)

### add

Add packages to a dependency group:

```bash
deps add <group> <package> [<package>...] [--pkg <path>]
```

**Parameters:**

- `<group>`: The dependency group to add to
- `<package>`: Package specification (e.g., `react`, `react@^18.0.0`, `@types/node@latest`)
- `--pkg`: Path to a custom package.json (defaults to `./package.json`)

### remove

Remove packages from a dependency group:

```bash
deps remove <group> <package> [<package>...] [--pkg <path>]
```

**Parameters:**

- `<group>`: The dependency group to remove from
- `<package>`: Package name(s) to remove
- `--pkg`: Path to a custom package.json (defaults to `./package.json`)

## Examples

Install standard dependencies:

```bash
deps install deps
```

Install dev dependencies with npm:

```bash
deps install dev --pm npm
```

Install custom group dependencies using pnpm:

```bash
deps install cron --pm pnpm
```

Install using a custom package.json:

```bash
deps install cron --pkg ./apps/foo/package.json
```

Add packages to a group:

```bash
deps add deps react@^18.0.0
deps add dev typescript @types/node
deps add cron croner@^10.0.1
```

Remove packages from a group:

```bash
deps remove deps react
deps remove dev @types/node
```
