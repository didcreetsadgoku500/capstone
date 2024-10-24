This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project Structure

`.env.sample` contains a sample set of environment variables necessary for running the project. Rename the file to `.env.local` and replace the values with API keys from osu! and a connection string from your repo.

The `src/` directory contains any relevant TypeScript code. 

`src/app/` is the Next.js App-Router directory. Subroutes are indicated by subfolders, and the page itself for a given route is given by `page.tsx`. Other components in the app directory are likely page-specific components or global styling.

`src/components/` describes reusable React components. Components in `src/components/ui/` are originally imported using shadcn, but may be modified.

`src/lib/` contains TypeScript utility functions that may be used throughout the app, such as a global singleton for the database connection, overrides for authentication providers, or functions for verifying user roles.

Other files are probably boilerplate configuration for various dependencies.