import { useRouteDataLoaderContext } from '../contexts/RouteLoaderDataProvider.js'

export function useRouteLoaderData<T>(id: string) {
  return useRouteDataLoaderContext().entries.get(id) as T | undefined
}
