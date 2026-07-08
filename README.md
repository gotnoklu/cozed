# Cozed

Convert VSCode themes into Zed themes.

## Usage

```sh
Cozed

  Converts VSCode themes into Zed themes.

Options

  -h, --help                      Display this usage guide.
  -s, --src file                  The VSCode theme file to convert.
  -o, --output path               The destination path where the Zed theme will
                                  be created. When "--extension" or "-e" is
                                  set, the destination must be a folder, else,
                                  it must be the path of a JSON file ending in
                                  ".json".
  -n, --name name                 The custom name you want to pass for the
                                  theme.
  -a, --author authors...         The author(s) of the theme. Accepts more than
                                  one author
  -d, --description description   The description of the theme. This only
                                  applies to extensions created from themes.
  -e, --extension                 Whether to create a Zed extension or just a
                                  file with the converted theme. When this is
                                  set, the destination must be a folder, else,
                                  it must be the path of a JSON file ending in
                                  ".json".
```

## Installation

With `npm`:

```sh
npm install -g @gotnoklu/cozed
```

With `npx` (for one-off tasks without installation):

```sh
npx @gotnoklu/cozed
```

## Examples

Display help guide:

```sh
cozed -h
```

<br>

Convert VSCode theme at `./code-theme.json` to a Zed extension at `./zed-theme`:

```sh
cozed -s ./code-theme.json -o ./zed-theme -e
```

<br>

Convert VSCode theme at `./code-theme.json` to a Zed theme (wihtout creating an extension) at `./zed-theme.json`. The `.json` is necessary in this case:

```sh
cozed -s ./code-theme.json -o ./zed-theme.json
```

## Contributors
[gotnoklu](https://github.com/gotnoklu)

## License
MIT