import { createBrowserRouter, Outlet, RouterProvider } from '@crcarrick/router'
// import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

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
        index: true,
        element: (
          <div>
            <h2>Hm</h2>
          </div>
        ),
      },
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
                index: true,
                element: <h3>Index</h3>,
              },
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
