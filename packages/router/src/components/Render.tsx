import React from 'react'

import { ErrorProvider } from '../contexts/ErrorProvider.js'
import { LoaderDataProvider } from '../contexts/LoaderDataProvider.js'
import { OutletProvider } from '../contexts/OutletProvider.js'
import { ParamsProvider } from '../contexts/ParamsProvider.js'
import type { Route } from '../types.js'
import { invariant } from '../utils/invariant.js'

import { RouteErrorBoundary } from './RouteErrorBoundary.js'

export interface RenderProps {
  route: Route
}

export function Render({ route }: RenderProps) {
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
  invariant(
    !(route.ErrorBoundary && route.errorElement),
    `Route ${route.path} should have either ErrorBoundary or errorElement, not both`,
  )

  const Component = route.Component ? <route.Component /> : route.element
  const ErrorComponent = route.ErrorBoundary ? (
    <route.ErrorBoundary />
  ) : (
    route.errorElement
  )

  return (
    <ErrorProvider>
      <ParamsProvider route={route}>
        <RouteErrorBoundary errorElement={ErrorComponent}>
          <LoaderDataProvider route={route}>
            <OutletProvider route={route}>{Component}</OutletProvider>
          </LoaderDataProvider>
        </RouteErrorBoundary>
      </ParamsProvider>
    </ErrorProvider>
  )
}
