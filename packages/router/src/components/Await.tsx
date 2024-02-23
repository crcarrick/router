import { AwaitProvider } from '../contexts/AwaitProvider.js'
import type { Resource } from '../utils/defer.js'

interface AwaitProps<T> {
  children: React.ReactNode
  resolve: Resource<T>
  errorElement?: React.ReactNode
}

export function Await<T>({ children, resolve, errorElement }: AwaitProps<T>) {
  return (
    <AwaitProvider resolve={resolve} errorElement={errorElement}>
      {children}
    </AwaitProvider>
  )
}
