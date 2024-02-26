import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
} from '@crcarrick/router'
import { lazy } from 'react'

const Home = lazy(() => {
  return new Promise<typeof import('./Home.js')>((resolve) => {
    setTimeout(() => {
      resolve(import('./Home.js'))
    }, 1000)
  })
})
const About = lazy(() => {
  return new Promise<typeof import('./About.js')>((resolve) => {
    setTimeout(() => {
      resolve(import('./About.js'))
    }, 2000)
  })
})

function Layout() {
  return (
    <div>
      <h1>00_playground</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/home"
              style={({ isActive, isPending, isTransitioning }) => ({
                color: isActive ? 'red' : 'blue',
                fontWeight: isPending ? 'bold' : 'normal',
                textDecoration: isTransitioning ? 'underline' : 'none',
              })}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={({ isActive, isPending, isTransitioning }) => ({
                color: isActive ? 'red' : 'blue',
                fontWeight: isPending ? 'bold' : 'normal',
                textDecoration: isTransitioning ? 'underline' : 'none',
              })}
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
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
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {},
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
