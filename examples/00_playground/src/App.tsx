import { createBrowserRouter, Outlet, RouterProvider } from '@crcarrick/router'

function Layout() {
  return (
    <div>
      <h1>00_playground</h1>
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'posts',
        element: (
          <div>
            <h1>Posts</h1>
            <Outlet />
          </div>
        ),
        children: [
          {
            path: ':id',
            element: (
              <div>
                <h2>Post</h2>
                <Outlet />
              </div>
            ),
            children: [
              {
                path: 'edit',
                element: <h3>Edit</h3>,
              },
            ],
          },
        ],
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
