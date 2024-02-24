import React from 'react'

import { ErrorProvider } from '../contexts/ErrorProvider.js'
import { LoaderDataProvider } from '../contexts/LoaderDataProvider.js'
import { OutletProvider } from '../contexts/OutletProvider.js'
import { ParamsProvider } from '../contexts/ParamsProvider.js'
import type { RouteMatch } from '../types.js'
import { invariant } from '../utils/invariant.js'

import { RouteErrorBoundary } from './RouteErrorBoundary.js'

export interface RenderProps {
  match: RouteMatch
  matches: RouteMatch[]
}

export function Render({ matches }: RenderProps) {
  const [match, ...rest] = matches

  if (!match) return null

  const route = match.route
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
      <ParamsProvider params={match.params}>
        <RouteErrorBoundary errorElement={ErrorComponent}>
          <LoaderDataProvider route={route}>
            <OutletProvider matches={rest}>{Component}</OutletProvider>
          </LoaderDataProvider>
        </RouteErrorBoundary>
      </ParamsProvider>
    </ErrorProvider>
  )
}
