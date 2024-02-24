import { resolve } from '@crcarrick/example-utils'
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
  type LoaderData,
} from '@crcarrick/router'

function homeLoader() {
  return resolve({ message: 'Hello from the loader!' }, 1000)
}

function Home() {
  const data = useLoaderData<LoaderData<typeof homeLoader>>()

  return (
    <div>
      <h1>02_loader</h1>
      <h2>{data?.message}</h2>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    loader: homeLoader,
    element: <Home />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
