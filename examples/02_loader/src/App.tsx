import {
  createBrowserRouter,
  createRoute,
  RouterProvider,
  useLoaderData,
  type LoaderData,
} from '@router/router'

function homeLoader() {
  return new Promise<{ message: string }>((resolve) => {
    setTimeout(() => resolve({ message: 'Hello from the loader!' }), 1000)
  })
}

function Home() {
  const data = useLoaderData<LoaderData<typeof homeLoader>>()

  return (
    <div>
      <h1>Home</h1>
      <h2>{data?.message}</h2>
    </div>
  )
}

const router = createBrowserRouter([
  createRoute({
    path: '/',
    loader: homeLoader,
    component: Home,
  }),
])

export default function App() {
  return <RouterProvider router={router} />
}
