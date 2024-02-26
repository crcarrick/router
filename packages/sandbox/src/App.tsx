import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  json,
  redirect,
  redirectDocument,
  useLoaderData,
  useOutletContext,
} from '@crcarrick/router'
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
        path: 'redirect',
        loader() {
          return redirect('/posts/1/edit')
        },
        element: null,
      },
      {
        path: 'redirect-document',
        loader() {
          return redirectDocument('/posts/1/edit')
        },
        element: null,
      },
      {
        path: 'json',
        loader() {
          return json({ message: 'Hello, world!' })
        },
        Component() {
          const data = useLoaderData()
          return (
            <div>
              <h2>JSON Loader</h2>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )
        },
      },
      {
        path: 'posts',
        element: (
          <div>
            <h1>Posts</h1>
            <Outlet context={{ message: 'Hello from outlet context' }} />
          </div>
        ),
        children: [
          {
            path: ':id',
            Component() {
              const context = useOutletContext<{ message: string }>()

              return (
                <div>
                  <h2>Post</h2>
                  <p>{context.message}</p>
                  <Outlet />
                </div>
              )
            },
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
      {
        path: '*',
        element: <h1>Not Found</h1>,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
