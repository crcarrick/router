import { useContext } from 'react'

import { RouterContext } from '../contexts/RouterProvider.js'

export function useLocation() {
  return useContext(RouterContext).location
}
