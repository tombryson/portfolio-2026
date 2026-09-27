# Tom Bryson — Portfolio

Personal portfolio for Tom Bryson, a software engineer based in Melbourne.

**Live site:** https://www.tombryson.com

## Public release snapshot

This repository is a public release snapshot of an existing project. Its initial
commit marks publication of this snapshot, not the start of development. The
original development repository and its complete history are retained separately.

The site presents professional experience and three independently developed
applications: Alpha Edge, Russian Arcade and Burning Airlines. It includes
project screenshots, an Alpha Edge video tour and contact details.

## Development

Requires Node.js 22 or newer and pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Application code lives in `src/`; static assets are
in `public/`.

## Production build

```sh
pnpm build
```

The Next.js configuration produces standalone output. The multi-stage Dockerfile
packages that output together with `public/` and `.next/static/`.

## Deployment

The existing Fly.io app is `tombryson-portfolio`, configured in `fly.toml`.
Deployment is manual using an authorised Fly.io account:

```sh
flyctl deploy --remote-only --app tombryson-portfolio
```

Publishing this repository does not deploy it, change the domain or replace the
running Fly.io release. No GitHub deployment workflow is configured.

## Attribution and asset rights

See [ATTRIBUTION.md](ATTRIBUTION.md). No new blanket licence is granted by this
snapshot. Existing third-party notices and asset provenance notes are retained.
