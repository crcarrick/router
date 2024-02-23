import {
  createBrowserRouter,
  createRoute,
  Link,
  RouterProvider,
} from '@crcarrick/router'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/about">About</Link>
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
  createRoute({
    path: '/',
    element: <Home />,
  }),
  createRoute({
    path: '/about',
    element: <About />,
  }),
])

export default function App() {
  return <RouterProvider router={router} />
}
