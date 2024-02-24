import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from '@crcarrick/router'

function Layout() {
  return (
    <div>
      <h1>03_outlet</h1>
      <Link to="/parent">Parent</Link>
      <Link to="/parent/child">Child</Link>
      <Outlet />
    </div>
  )
}

function Parent() {
  return (
    <div>
      <h1>Parent</h1>
      <Outlet />
    </div>
  )
}

function Child() {
  return <h2>Child</h2>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'parent',
        element: <Parent />,
        children: [{ path: 'child', element: <Child /> }],
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
