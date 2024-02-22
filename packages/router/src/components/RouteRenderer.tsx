import { LoaderDataProvider } from '../contexts/LoaderDataProvider.js'
import type { PathParams, Route } from '../types.js'

interface RouteRendererProps<T extends string> {
  route: Route<T>
  params: PathParams<T>
}

export function RouteRenderer<T extends string>({
  route,
  params,
}: RouteRendererProps<T>) {
  const Component = route.component

  return (
    <LoaderDataProvider route={route} params={params}>
      <Component />
    </LoaderDataProvider>
  )
}
