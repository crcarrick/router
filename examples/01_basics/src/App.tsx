import { createBrowserRouter, RouterProvider } from '@crcarrick/router'

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
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
