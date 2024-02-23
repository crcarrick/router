import { AwaitProvider } from '../contexts/AwaitProvider.js'
import type { Resource } from '../utils/defer.js'

interface AwaitProps<T> {
  children: React.ReactNode
  resolve: Resource<T>
}

export function Await<T>({ children, resolve }: AwaitProps<T>) {
  return <AwaitProvider resolve={resolve}>{children}</AwaitProvider>
}
