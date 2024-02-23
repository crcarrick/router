import {
  createBrowserRouter,
  createRoute,
  Outlet,
  RouterProvider,
} from '@router/router'

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
  createRoute({
    path: '/',
    component: Parent,
    children: [createRoute({ path: 'child', component: Child })],
  }),
])

export default function App() {
  return <RouterProvider router={router} />
}
