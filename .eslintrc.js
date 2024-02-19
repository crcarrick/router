/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.eslint.json',
      './packages/*/tsconfig.json',
      './examples/*/tsconfig.json',
    ],
  },
  extends: ['@crcarrick/eslint-config'],
}
