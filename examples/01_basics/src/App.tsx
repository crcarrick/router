import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from '@crcarrick/router'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/about">About</Link>
      <Outlet />
    </div>
  )
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <Link to="/">Home</Link>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
