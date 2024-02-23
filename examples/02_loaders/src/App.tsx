import {
  RouterProvider,
  createBrowserRouter,
  createRoute,
  Outlet,
  useParams,
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
  createRoute({
    path: '/posts',
    component: () => (
      <div>
        Posts <Outlet />
      </div>
    ),
    children: [
      createRoute({
        path: ':postId',
        component: function Post() {
          const params = useParams()

          return <div>Post {params.postId}</div>
        },
      }),
    ],
  }),
])

export default function App() {
  return <RouterProvider router={router} />
}
