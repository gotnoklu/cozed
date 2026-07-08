#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import type { VscodeTheme } from './types/vscode'
import { convertVscodeTheme, createZedThemeConfig, createZedThemeExtension } from './utilities'

function main() {
  const usage = commandLineUsage([
    {
      header: 'Cozed',
      content: 'Converts VSCode themes into Zed themes.',
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'help',
          description: 'Display this usage guide.',
          alias: 'h',
          type: Boolean,
        },
        {
          name: 'src',
          alias: 's',
          description: 'The VSCode theme file to convert.',
          type: String,
          typeLabel: '{underline file}',
        },
        {
          name: 'output',
          alias: 'o',
          description:
            'The destination path where the Zed theme will be created. When "--extension" or "-e" is set, the destination must be a folder, else, it must be the path of a JSON file ending in ".json".',
          type: String,
          defaultValue: './',
          typeLabel: '{underline path}',
        },
        {
          name: 'name',
          alias: 'n',
          description: 'The custom name you want to pass for the theme.',
          type: String,
          typeLabel: '{underline name}',
        },
        {
          name: 'author',
          alias: 'a',
          description: 'The author(s) of the theme. Accepts more than one author',
          type: String,
          typeLabel: '{underline authors...}',
          multiple: true,
        },
        {
          name: 'description',
          alias: 'd',
          description: 'The description of the theme. This only applies to extensions created from themes.',
          type: String,
          typeLabel: '{underline description}',
        },
        {
          name: 'extension',
          alias: 'e',
          description:
            'Whether to create a Zed extension or just a file with the converted theme. When this is set, the destination must be a folder, else, it must be the path of a JSON file ending in ".json".',
          type: Boolean,
        },
      ],
    },
  ])

  try {
    const options = commandLineArgs([
      { name: 'help', alias: 'h', type: Boolean },
      { name: 'src', alias: 's', type: String },
      { name: 'output', alias: 'o', type: String },
      { name: 'name', alias: 'n', type: String },
      { name: 'author', alias: 'a', type: String, multiple: true },
      { name: 'description', alias: 'd', type: String },
      { name: 'extension', alias: 'e', type: Boolean, defaultValue: true },
    ])

    const { help, name, author, src, output, description, extension } = options

    if (help) {
      return console.log(usage)
    }

    if (!src) {
      return console.error('The path of the VSCode theme is required by "--src" or "-s".')
    }

    // Read and parse VSCode theme
    const vscodeTheme: VscodeTheme = JSON.parse(fs.readFileSync(src, 'utf8'))
    let outputPath

    if (extension) {
      outputPath = createZedThemeExtension({
        src: output ?? path.resolve('./', path.parse(src).name),
        theme: convertVscodeTheme(vscodeTheme),
        name,
        authors: author,
        description,
      })
    } else {
      outputPath = createZedThemeConfig({
        src: output ? path.resolve(output) : path.resolve(path.join('./', '.zed.json')),
        theme: convertVscodeTheme(vscodeTheme),
        name,
        author: author[0],
      })
    }

    console.log(`Theme converted and saved to ${outputPath}`)
  } catch (error) {
    if ((error as TypeError).name === 'UNKNOWN_OPTION') {
      console.error((error as TypeError).message)
      console.log(usage)
    } else {
      console.error(error)
    }
    process.exit(1)
  }
}

main()
