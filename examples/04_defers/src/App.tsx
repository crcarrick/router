import { resolve } from '@crcarrick/example-utils'
import {
  Await,
  createBrowserRouter,
  defer,
  RouterProvider,
  useAsyncValue,
  useLoaderData,
  type LoaderData,
} from '@crcarrick/router'
import { Suspense } from 'react'

async function homeLoader() {
  return defer({
    foo: 'foo',
    bar: resolve('bar', 3000),
    baz: await resolve('baz', 1000),
  })
}

function Home() {
  const data = useLoaderData<LoaderData<typeof homeLoader>>()

  if (!data) {
    return null
  }

  return (
    <div>
      <h1>04_defers</h1>
      <Suspense fallback={<div>Never shows...</div>}>
        <Await resolve={data.foo}>
          <Foo />
        </Await>
      </Suspense>
      <Suspense fallback={<div>Awaiting bar...</div>}>
        <Await resolve={data.bar}>
          <Bar />
        </Await>
      </Suspense>
      <Suspense fallback={<div>Never shows...</div>}>
        <Await resolve={data.baz}>
          <Baz />
        </Await>
      </Suspense>
    </div>
  )
}

function Foo() {
  const value = useAsyncValue<string>()

  return <div>{value}</div>
}

function Bar() {
  const value = useAsyncValue<string>()

  return <div>{value}</div>
}

function Baz() {
  const value = useAsyncValue<string>()

  return <div>{value}</div>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: homeLoader,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
