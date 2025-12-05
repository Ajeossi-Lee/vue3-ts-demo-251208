/// <reference types="vite/client" />

interface ImportMeta {
  readonly glob: <T = Record<string, () => Promise<any>>>(
    pattern: string,
    options?: {
      eager?: boolean
      import?: string
      query?: string | Record<string, string | number | boolean>
      /**
       * @deprecated Use `query` instead
       */
      as?: string
    }
  ) => T
}

