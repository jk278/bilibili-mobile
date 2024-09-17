declare module '$' {
  export const GM_getValue: (name: string, defaultValue?: unknown) => unknown
  export const GM_setValue: (name: string, value: unknown) => void
  export const unsafeWindow: Window
  export const GM_registerMenuCommand: (
    name: string,
    callback: (event?: MouseEvent) => void,
    accessKey?: string,
  ) => void
}
