import { useContext } from 'react'

import { RouterContext } from '../contexts/RouterProvider.js'

export function useNavigationType() {
  return useContext(RouterContext).router.history.action
}
