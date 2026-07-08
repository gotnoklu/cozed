import { execSync } from 'node:child_process'
import { defineConfig, type RsbuildPlugin } from '@rslib/core'

const generateTypesOnWatch = (): RsbuildPlugin => ({
  name: 'generate-types-on-watch',
  setup(api) {
    api.onAfterBuild({
      order: 'pre',
      handler: () => {
        execSync('tsc --declaration --emitDeclarationOnly', { stdio: 'inherit' })
        console.log('\x1b[1;32msuccess\x1b[0m Typescript types generated.')
      },
    })
  },
})

export default defineConfig({
  resolve: { extensions: ['.ts', '.mjs', '.js', '.json'] },
  lib: [
    {
      format: 'esm',
      syntax: 'esnext',
      bundle: false,
      autoExtension: false,
      source: {
        entry: {
          index: ['./src/**', '!./src/**/*.{md,json,txt}', '!./src/types/**'],
        },
        include: ['package.json', 'tsconfig.json'],
      },
      output: {
        target: 'node',
        cleanDistPath: true,
        copy: {
          patterns: [
            {
              from: '**/*.txt',
              context: './src',
              noErrorOnMissing: true,
              to({ absoluteFilename }) {
                return absoluteFilename?.replace('./src', './dist') as string
              },
            },
          ],
        },
        distPath: {
          root: './dist',
        },
      },
      plugins: [generateTypesOnWatch()],
    },
  ],
})
