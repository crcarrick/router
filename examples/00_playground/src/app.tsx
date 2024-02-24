import { createBrowserRouter, RouterProvider } from '@crcarrick/router'

function Home() {
  return <h1>Home</h1>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
