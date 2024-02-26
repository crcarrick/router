import { useState, useTransition } from 'react'

import { useLocation } from '../hooks/useLocation.js'
import { useNavigate } from '../hooks/useNavigate.js'

export interface NavLinkStyleArgs {
  isActive: boolean
  isPending: boolean
  // TODO: this is basically just a proxy for isPending, but it's maybe
  //       supposed to be different?
  isTransitioning: boolean
}

export interface NavLinkStyleFunction<T> {
  (args: NavLinkStyleArgs): T
}

export interface NavLinkProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'className' | 'href' | 'onClick' | 'style'
  > {
  to: string
  children: React.ReactNode
  className?: string | NavLinkStyleFunction<string>
  style?: React.CSSProperties | NavLinkStyleFunction<React.CSSProperties>
}

export function NavLink({
  to,
  children,
  className: classNameProp,
  style: styleProp,
  ...props
}: NavLinkProps) {
  const [isPending, startTransition] = useTransition()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const isActive = location.pathname === to && !isPending

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()
    setIsTransitioning(true)
    startTransition(() => {
      setIsTransitioning(false)
      navigate(to)
    })
  }

  const className =
    typeof classNameProp === 'function'
      ? classNameProp({ isActive, isPending, isTransitioning })
      : classNameProp
  const style =
    typeof styleProp === 'function'
      ? styleProp({ isActive, isPending, isTransitioning })
      : styleProp

  return (
    <a
      {...props}
      className={className}
      href={to}
      onClick={handleClick}
      style={style}
    >
      {children}
    </a>
  )
}
