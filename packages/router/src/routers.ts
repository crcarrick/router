import type { RouteObjects } from './types.js'

export function createBrowserRouter<T extends string>(routes: RouteObjects<T>) {
  // ...
  console.log(routes)
}
