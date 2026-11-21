# ReactJs Examples

A playground for learning React, started in 2016 with the official
[Quick Start tutorial](https://legacy.reactjs.org/docs/getting-started.html) and now being
modernized step by step (TypeScript, hooks, React 19, testing, Server Components, design systems).

The roadmap lives in the [milestones](https://github.com/brunoarueira/reactjs-examples/milestones):
one milestone per phase, one issue per step.

## Structure

```
apps/api   Express API serving /api/comments (plain JS until Phase 4)
```

## Getting started

```sh
nvm use        # Node version from .nvmrc
npm install
npm run dev:api
```

## The original 2016 version

The pre-modernization code is preserved under the `v2016` tag:

```sh
git show v2016:quick-start-tutorial/public/scripts/comment_box_example.js
git checkout v2016   # to browse/run it (then `npm install && node quick-start-tutorial/server.js`)
```

Or browse it on GitHub: <https://github.com/brunoarueira/reactjs-examples/tree/v2016>
