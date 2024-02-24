import { reject } from '@crcarrick/example-utils'
import {
  Await,
  createBrowserRouter,
  defer,
  Link,
  RouterProvider,
  useAsyncError,
  useLoaderData,
  useRouteError,
  type LoaderData,
} from '@crcarrick/router'
import { Suspense } from 'react'

function Home() {
  return (
    <div>
      <h1>Errors</h1>
      <Link to="/async-error">Async Error</Link>
      <Link to="/route-error">Route Error</Link>
    </div>
  )
}

function asyncErrorLoader() {
  return defer({ oops: reject(new Error('Oops'), 1000) })
}

function AsyncError() {
  const data = useLoaderData<LoaderData<typeof asyncErrorLoader>>()

  if (!data) {
    return null
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data.oops} errorElement={<AsyncErrorElement />}>
        <div>Should never show</div>
      </Await>
    </Suspense>
  )
}

function AsyncErrorElement() {
  const asyncError = useAsyncError()

  return (
    <div>
      <h1>Async Error: </h1>
      <pre>{asyncError?.stack}</pre>
    </div>
  )
}

function routeErrorLoader() {
  return reject(new Error('Oops'), 1000)
}

function RouteError() {
  return <div>Should temporarily show</div>
}

function RouteErrorElement() {
  const routeError = useRouteError()

  return (
    <div>
      <h1>Route Error: </h1>
      <pre>{routeError?.stack}</pre>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/async-error',
    element: <AsyncError />,
    loader: asyncErrorLoader,
  },
  {
    path: '/route-error',
    element: <RouteError />,
    errorElement: <RouteErrorElement />,
    loader: routeErrorLoader,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
