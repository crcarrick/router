import { LoaderDataProvider } from '../contexts/LoaderDataProvider.js'
import { OutletProvider } from '../contexts/OutletProvider.js'
import { ParamsProvider } from '../contexts/ParamsProvider.js'
import type { PathParams, Route } from '../types.js'
import { invariant } from '../utils/invariant.js'

interface RouteRendererProps<T extends string> {
  route: Route<T>
  params: PathParams<T>
}

export function RouteRenderer<T extends string>({
  route,
  params,
}: RouteRendererProps<T>) {
  const hasElement = route.element !== undefined
  const hasComponent = route.Component !== undefined
  invariant(
    !hasElement && !hasComponent,
    `Route ${route.path} should have either element or Component`,
  )
  invariant(
    hasElement && hasComponent,
    `Route ${route.path} should have either element or Component, not both`,
  )

  const Component = route.Component ? <route.Component /> : route.element

  return (
    <LoaderDataProvider route={route} params={params}>
      <OutletProvider route={route}>
        <ParamsProvider route={route}>{Component}</ParamsProvider>
      </OutletProvider>
    </LoaderDataProvider>
  )
}
