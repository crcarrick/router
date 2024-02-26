import { useLayoutEffect } from 'react'

import { useNavigate } from '../hooks/useNavigate.js'
import { NavigateOptions } from '../types.js'

export interface NavigateProps {
  to: string
  state?: NavigateOptions['state']
  replace?: NavigateOptions['replace']
}

export function Navigate({ to, ...options }: NavigateProps) {
  const navigate = useNavigate()

  useLayoutEffect(() => {
    navigate(to, options)
  }, [to, options, navigate])

  return null
}
