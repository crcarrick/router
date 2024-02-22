import { createBrowserHistory } from 'history'
import { default as _jsSHA } from 'jssha'

import type { BrowserRouter, Route, RouteObject } from './types.js'

// jssha types don't work in esm
interface JSSHA {
  new (variant: string, input: string, format: { encoding: string }): this
  getHash: (format: string) => string
  update: (message: string) => void
}

const jsSHA = _jsSHA as unknown as JSSHA

function hashPath(id: string) {
  const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' })
  shaObj.update(id)
  return shaObj.getHash('HEX')
}

export function createRoute<const T extends string>(route: RouteObject<T>) {
  const id = route.id ? route.id : hashPath(route.path)
  return { ...route, id } as Route<T>
}

export function createBrowserRouter<T extends string>(
  routes: Array<Route<T>>,
): BrowserRouter<T> {
  const history = createBrowserHistory({ window })

  return { history, routes } as BrowserRouter<T>
}
