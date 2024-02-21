import { Link } from '@router/router'

interface HomeProps {
  data: { message: string }
  params: {}
}

export default function Home({ data }: HomeProps) {
  return (
    <div>
      <h1>Home</h1>
      <h2>{data.message}</h2>
      <Link to="/about">About</Link>
    </div>
  )
}
