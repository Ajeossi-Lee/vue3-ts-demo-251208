/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, any>, Record<string, any>, any>
  export default component
}

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

