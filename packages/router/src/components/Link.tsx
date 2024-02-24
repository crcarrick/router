import { startTransition } from 'react'

import { useNavigate } from '../hooks/useNavigate.js'

export interface LinkProps {
  to: string
  children: React.ReactNode
}

export function Link({ to, children }: LinkProps) {
  const navigate = useNavigate()
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()
    startTransition(() => {
      navigate(to)
    })
  }

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
