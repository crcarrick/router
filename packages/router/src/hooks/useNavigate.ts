import { useContext } from 'react'

import { RouterContext } from '../contexts/RouterProvider.js'

export function useNavigate() {
  return useContext(RouterContext).navigate
}
