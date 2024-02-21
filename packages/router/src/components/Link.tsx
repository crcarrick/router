import { startTransition, type MouseEventHandler, type ReactNode } from 'react'

import { useNavigate } from '../hooks/useNavigate.js'

interface LinkProps {
  to: string
  children: ReactNode
}

export function Link({ to, children }: LinkProps) {
  const navigate = useNavigate()
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
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
