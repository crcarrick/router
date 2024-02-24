import cp from 'node:child_process'
import path from 'node:path'

import { findUp } from 'find-up'
import latestVersion from 'latest-version'

const PACKAGES = /** @type {const} */ ([
  '@types/node',
  '@types/react',
  '@types/react-dom',
  '@vitejs/plugin-react',
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'typescript',
  'vite',
])

const workspace = path.dirname(await findUp('pnpm-workspace.yaml'))
const examples = path.join(workspace, 'examples', '{{name}}')
const packages = path.join(workspace, 'packages', '{{name}}')

/** @type {Record<typeof PACKAGES[number], string>} */
const versions = Object.fromEntries(
  await Promise.all(
    PACKAGES.map((name) =>
      latestVersion(name).then((version) => [name, `^${version}`]),
    ),
  ),
)

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setActionType('install', ({ name }, config) => {
    return new Promise((resolve, reject) => {
      const pnpm = cp.spawn('pnpm', ['install'], {
        cwd: path.join(workspace, config.dest, name),
        shell: true,
        stdio: 'inherit',
      })

      pnpm.on('error', reject)
      pnpm.on('close', (code) => (code === 0 ? resolve() : reject()))
    })
  })

  plop.setGenerator('package', {
    description: 'Create a package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Package name',
      },
    ],

    actions: [
      { type: 'add', path: path.join(packages, 'src', 'index.ts') },
      {
        type: 'add',
        path: path.join(packages, 'package.json'),
        templateFile: './templates/package.json.hbs',
        data: {
          dependencies: {
            devDependencies: [
              { name: '@types/node', version: versions['@types/node'] },
              { name: 'typescript', version: '^5.4.0-beta' },
            ],
          },
          scripts: [
            { name: 'build', command: 'pnpm clean && tsc -p tsconfig.json' },
            {
              name: 'clean',
              command: 'rm -rf ./dist && rm -rf tsconfig.tsbuildinfo',
            },
            { name: 'tests', command: '' },
            {
              name: 'watch',
              command: 'pnpm clean && tsc -p tsconfig.json --watch',
            },
          ],
        },
      },
      {
        type: 'add',
        path: path.join(packages, 'tsconfig.json'),
        templateFile: './templates/tsconfig.json.hbs',
      },
      { type: 'install', dest: 'packages' },
    ],
  })

  plop.setGenerator('example', {
    description: 'Create an example',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Example name',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: examples,
        templateFiles: './templates/**/*',
        data: {
          private: true,
          dependencies: {
            dependencies: [
              { name: '@crcarrick/router', version: 'workspace:*' },
              { name: '@crcarrick/example-utils', version: 'workspace:*' },
              { name: 'react', version: versions['react'] },
              { name: 'react-dom', version: versions['react-dom'] },
              { name: 'react-router', version: versions['react-router'] },
              {
                name: 'react-router-dom',
                version: versions['react-router-dom'],
              },
            ],
            devDependencies: [
              { name: '@types/node', version: versions['@types/node'] },
              { name: '@types/react', version: versions['@types/react'] },
              {
                name: '@types/react-dom',
                version: versions['@types/react-dom'],
              },
              {
                name: '@vitejs/plugin-react',
                version: versions['@vitejs/plugin-react'],
              },
              { name: 'typescript', version: '^5.4.0-beta' },
              { name: 'vite', version: versions['vite'] },
            ],
          },
          scripts: [{ name: 'start', command: 'vite' }],
        },
      },
      { type: 'install', dest: 'examples' },
    ],
  })
}
