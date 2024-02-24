import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

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
    children: [
      {
        path: 'posts',
        element: (
          <div>
            Posts <Outlet />
          </div>
        ),
        children: [
          {
            path: ':id',
            element: (
              <div>
                Post <Outlet />
              </div>
            ),
            children: [
              {
                path: 'edit',
                element: <div>Edit</div>,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/about',
    element: <About />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
