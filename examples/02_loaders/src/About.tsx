import { Link, useRouteLoaderData } from '@router/router'

export default function About() {
  const home = useRouteLoaderData<{ message: string }>('home')

  return (
    <div>
      <h1>About</h1>
      <Link to="/">{home?.message}</Link>
    </div>
  )
}
