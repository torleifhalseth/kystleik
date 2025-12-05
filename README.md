# Kystleik Monorepo

This is a monorepo managed with pnpm containing the Kystleik website and Sanity studio.

## Structure

- **web/**: Next.js 15 website with App Router
- **studio/**: Sanity Studio CMS

## Prerequisites

- Node.js 18+ or 20+
- pnpm 9+ (install with `npm install -g pnpm`)

## Getting Started

### Install Dependencies

From the root directory:

```bash
pnpm install
```

This will install dependencies for all packages in the monorepo.

### Development

Run the Next.js website:

```bash
pnpm dev
```

Run the Sanity Studio:

```bash
pnpm studio:dev
```

### Building

Build the Next.js website:

```bash
pnpm build
```

### Other Commands

```bash
# Clean all node_modules and build artifacts
pnpm clean

# Run linting
pnpm lint

# Deploy Sanity Studio
pnpm studio:deploy
```

## Workspace Commands

You can also run commands in specific workspaces:

```bash
# Run a command in the web package
pnpm --filter web <command>

# Run a command in the studio package
pnpm --filter studio <command>
```

## Documentation

- [Web Documentation](./web/README.md)
- [Sanity Studio Documentation](./studio/README.md)

## Tech Stack

- **Package Manager**: pnpm (workspaces)
- **Frontend**: Next.js 15 with App Router
- **CMS**: Sanity.io
- **Styling**: CSS Modules + Tailwind CSS
