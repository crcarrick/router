import { useContext } from 'react'

import { RouteDataLoaderContext } from '../contexts/RouteLoaderDataProvider.js'

export function useRouteLoaderData<T>(id: string) {
  return useContext(RouteDataLoaderContext).entries.get(id) as T | undefined
}
