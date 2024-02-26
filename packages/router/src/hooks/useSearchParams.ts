import { useCallback, useMemo } from 'react'

import type { NavigateOptions } from '../types.js'

import { useLocation } from './useLocation.js'
import { useNavigate } from './useNavigate.js'

export interface SetSearchParams {
  <T extends Record<string, string>>(
    searchParams: T,
    navigateOptions?: NavigateOptions,
  ): void
}

export function useSearchParams() {
  const location = useLocation()
  const navigate = useNavigate()

  const setSearchParams = useCallback<SetSearchParams>(
    (searchParams, navigateOptions) => {
      const params = new URLSearchParams(searchParams)
      navigate(`${location.pathname}?${params.toString()}`, navigateOptions)
    },
    [location.pathname, navigate],
  )

  return useMemo(
    () => [new URLSearchParams(location.search), setSearchParams] as const,
    [location.search, setSearchParams],
  )
}
