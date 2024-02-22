import { Link, useLoaderData, type LoaderData } from '@router/router'

export function homeLoader() {
  return new Promise<{ message: string }>((resolve) => {
    setTimeout(() => resolve({ message: 'Hello from the loader!' }), 1000)
  })
}

type HomeLoaderData = LoaderData<typeof homeLoader>

export default function Home() {
  const data = useLoaderData<HomeLoaderData>()

  return (
    <div>
      <h1>Home</h1>
      <h2>{data?.message}</h2>
      <Link to="/about">About</Link>
    </div>
  )
}
