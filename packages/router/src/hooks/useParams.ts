import { useContext } from 'react'

import { RouterContext, type Params } from '../contexts/RouterProvider.js'

export function useParams<T extends Params<any>>() {
  return useContext(RouterContext).params as T
}
