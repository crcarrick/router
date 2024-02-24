import { useContext } from 'react'

import { RouterContext } from '../contexts/RouterProvider.js'

export function useMatches() {
  return useContext(RouterContext).matches
}
