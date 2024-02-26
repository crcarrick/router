import { useContext } from 'react'

import { RouterContext } from '../contexts/RouterProvider.js'

export function useInRouterContext() {
  return Boolean(useContext(RouterContext))
}
