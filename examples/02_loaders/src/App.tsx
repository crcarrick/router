import {
  RouterProvider,
  createBrowserRouter,
  createRoute,
} from '@router/router'
import { lazy } from 'react'

import { homeLoader } from './Home.js'

const Home = lazy(() => import('./Home.js'))
const About = lazy(() => import('./About.js'))

const router = createBrowserRouter([
  createRoute({
    path: '/',
    id: 'home',
    loader: homeLoader,
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
