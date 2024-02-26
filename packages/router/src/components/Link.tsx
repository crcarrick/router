import { startTransition } from 'react'

import { useNavigate } from '../hooks/useNavigate.js'

export interface LinkProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'onClick'
  > {
  to: string
  children: React.ReactNode
}

export function Link({ to, children, ...props }: LinkProps) {
  const navigate = useNavigate()
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()
    startTransition(() => {
      navigate(to)
    })
  }

  return (
    <a {...props} href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
