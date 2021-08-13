import {QVueGlobals} from './globals'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $q: QVueGlobals
  }
}

declare global {
  const __QUASAR_SSR_SERVER__: boolean
}