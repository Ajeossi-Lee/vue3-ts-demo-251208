import type { App } from 'vue'
import icons from './icons'
import { SvgIcon } from './svg-icon'

export function registerGlobComp(app: App) {
  app.use(icons).use(SvgIcon)
}
