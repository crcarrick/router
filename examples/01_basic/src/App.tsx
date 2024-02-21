import {
  RouterProvider,
  createBrowserRouter,
  createRoute,
} from '@router/router'

import About from './About.js'
import Home from './Home.js'

const router = createBrowserRouter([
  createRoute({
    path: '/',
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
