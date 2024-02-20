import cp from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

const EXAMPLE_INDEX_HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>  
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{name}}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`.trim()

const EXAMPLE_MAIN_TSX = `
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.js'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`.trim()

const EXAMPLE_APP_TSX = `
export default function App() {
  return <h1>Example: {{name}}</h1>
}
`.trim()

const EXAMPLE_VITE_CONFIG = `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`.trim()

const PACKAGE_JSON = `
{
  "name": "{{name}}",
  "version": "1.0.0",
  {{#if private}}
  "private": true,
  {{/unless}}
  "description": "",
  "author": {
    "name": "Chris Carrick",
    "email": "chris@crcarrick.dev"
  },
  "main": "dist/index.js",
  "types": "src/index.ts",
  "files": [
    "dist"
  ],
  "type": "module",
  "scripts": {
    {{#each scripts}}
    "{{name}}": "{{command}}"{{#unless @last}},{{/unless}}
    {{/each}}
  },
  {{#each dependencies}}
  "{{@key}}": {
    {{#each this}}
    "{{name}}": "{{version}}"{{#unless @last}},{{/unless}}
    {{/each}}
  }{{#unless @last}},{{/unless}}
  {{/each}}
}
`.trim()

const TSCONFIG_JSON = `
{
  "extends": "../../tsconfig.json",
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  }
}
`.trim()

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setActionType('install', ({ name }, config) => {
    return new Promise((resolve, reject) => {
      const pnpm = cp.spawn('pnpm', ['install'], {
        cwd: path.join(process.cwd(), config.dest, name),
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
      { type: 'add', path: 'packages/{{name}}/src/index.ts' },
      {
        type: 'add',
        path: 'packages/{{name}}/package.json',
        template: PACKAGE_JSON,
        data: {
          dependencies: {
            devDependencies: [{ name: 'typescript', version: '^5.3.3' }],
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
        path: 'packages/{{name}}/tsconfig.json',
        template: TSCONFIG_JSON,
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
        type: 'add',
        path: 'examples/{{name}}/src/main.tsx',
        template: EXAMPLE_MAIN_TSX,
      },
      {
        type: 'add',
        path: 'examples/{{name}}/src/App.tsx',
        template: EXAMPLE_APP_TSX,
      },
      {
        type: 'add',
        path: 'examples/{{name}}/index.html',
        template: EXAMPLE_INDEX_HTML,
      },
      {
        type: 'add',
        path: 'examples/{{name}}/package.json',
        template: PACKAGE_JSON,
        data: {
          private: true,
          dependencies: {
            dependencies: [
              { name: '@router/router', version: 'workspace:*' },
              { name: 'react', version: '^18.2.0' },
              { name: 'react-dom', version: '^18.2.0' },
            ],
            devDependencies: [
              { name: '@types/react', version: '^18.2.57' },
              { name: '@types/react-dom', version: '^18.2.19' },
              { name: '@vitejs/plugin-react', version: '^4.2.1' },
              { name: 'typescript', version: '^5.3.3' },
              { name: 'vite', version: '^5.1.1' },
            ],
          },
          scripts: [{ name: 'start', command: 'vite' }],
        },
      },
      {
        type: 'add',
        path: 'examples/{{name}}/tsconfig.json',
        template: TSCONFIG_JSON,
      },
      {
        type: 'add',
        path: 'examples/{{name}}/vite.config.ts',
        template: EXAMPLE_VITE_CONFIG,
      },
      { type: 'install', dest: 'examples' },
    ],
  })
}
