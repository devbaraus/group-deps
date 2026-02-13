# Group Deps

A tool to group dependencies in a `package.json` file.

## Installation

To install the tool, run:

```bash
npm jsr add -g @zerun/group-deps
```

``` bash
bunx jsr add @zerun/group-deps
```

## Setup

Add a custom group to your `package.json` like this:

```json
{
  "dependencies": {
    "react": "^18.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  },
  "cronDependencies": {
    "croner": "^10.0.1"
  }
}
```

## Usage

To use the tool, run:

```bash
deps install <group> --pm <bun|npm|pnpm|yarn>
```

### Parameters

- `<group>`: The group of dependencies to install. This can be `deps`, `dev`, or any custom group defined in your `package.json`.
- `--pm`: The package manager to use. Options include `bun`, `npm`, `pnpm`, or `yarn`. The default is `bun`.

## Example

To install the dependencies defined in the `dependencies` section of your `package.json`, run:

```bash
deps install deps
```

To install development dependencies, run:

```bash
deps install dev --pm npm
```

To install custom group dependencies, run:

```bash
deps install cron --pm pnpm
```
