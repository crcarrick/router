import {
  RouterProvider,
  createBrowserRouter,
  createRoute,
} from '@router/router'
import { lazy } from 'react'

const Home = lazy(() => import('./Home.js'))
const About = lazy(() => import('./About.js'))

const router = createBrowserRouter([
  createRoute({
    path: '/',
    loader() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: 'Hello, world!' })
        }, 1000)
      })
    },
    component: Home,
  }),
  createRoute({
    path: '/about',
    component: About,
  }),
])

export default function App() {
  return <RouterProvider router={router} />
}
