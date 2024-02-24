import { AwaitProvider } from '../contexts/AwaitProvider.js'
import type { Resource } from '../utils/defer.js'

import { AsyncErrorBoundary } from './AsyncErrorBoundary.js'

export interface AwaitProps<T> {
  children: React.ReactNode
  resolve: Resource<T>
  errorElement?: React.ReactElement
}

export function Await<T>({ children, resolve, errorElement }: AwaitProps<T>) {
  return (
    <AsyncErrorBoundary errorElement={errorElement}>
      <AwaitProvider resolve={resolve}>{children}</AwaitProvider>
    </AsyncErrorBoundary>
  )
}
