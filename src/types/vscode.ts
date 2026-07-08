export type VscodeTheme = {
  name: string
  type: string
  colors: { [key: string]: string }
  tokenColors: Array<{
    name?: string
    scope: string | string[]
    settings: {
      foreground?: string
      fontStyle?: string
    }
  }>
}
