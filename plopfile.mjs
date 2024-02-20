import cp from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

const PACKAGE_JSON = `
{
  "name": "{{name}}",
  "version": "1.0.0",
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
    "build": "pnpm clean && tsc -p tsconfig.json",
    "clean": "rm -rf ./dist && rm -rf tsconfig.tsbuildinfo",
    "tests": "",
    "watch": "pnpm clean && tsc -p tsconfig.json --watch"
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
      { type: 'add', path: 'examples/{{name}}/src/index.ts' },
      {
        type: 'add',
        path: 'examples/{{name}}/package.json',
        template: PACKAGE_JSON,
        data: {
          dependencies: {
            dependencies: [
              { name: 'react', version: '^18.2.0' },
              { name: 'react-dom', version: '^18.2.0' },
            ],
            devDependencies: [
              { name: '@types/react', version: '^18.2.57' },
              { name: '@types/react-dom', version: '^18.2.19' },
              { name: 'typescript', version: '^5.3.3' },
            ],
          },
        },
      },
      {
        type: 'add',
        path: 'examples/{{name}}/tsconfig.json',
        template: TSCONFIG_JSON,
      },
      { type: 'install', dest: 'examples' },
    ],
  })
}
