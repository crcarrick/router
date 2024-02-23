import React from 'react'

import { LoaderDataProvider } from '../contexts/LoaderDataProvider.js'
import { OutletProvider } from '../contexts/OutletProvider.js'
import { ParamsProvider } from '../contexts/ParamsProvider.js'
import type { PathParams, Route } from '../types.js'
import { invariant } from '../utils/invariant.js'

interface RenderProps<T extends string> {
  route: Route<T>
  params: PathParams<T>
}

export function Render<T extends string>({ route, params }: RenderProps<T>) {
  const hasElement = route.element !== undefined
  const hasComponent = route.Component !== undefined

  invariant(
    hasElement || hasComponent,
    `Route \`${route.path}\` should have either element or Component`,
  )
  invariant(
    !(hasElement && hasComponent),
    `Route \`${route.path}\` should have either element or Component, not both`,
  )

  const Component = route.Component ? <route.Component /> : route.element
  const Route = (
    <LoaderDataProvider route={route} params={params}>
      <OutletProvider route={route}>
        <ParamsProvider route={route}>{Component}</ParamsProvider>
      </OutletProvider>
    </LoaderDataProvider>
  )

  if (route.ErrorBoundary || route.errorElement) {
    invariant(
      !(route.ErrorBoundary && route.errorElement),
      `Route ${route.path} should have either ErrorBoundary or errorElement, not both`,
    )

    const ErrorElement = route.ErrorBoundary ? (
      <route.ErrorBoundary />
    ) : (
      route.errorElement
    )
    if (React.isValidElement(ErrorElement)) {
      return React.cloneElement(ErrorElement, {}, Route)
    }
  }

  return Route
}
