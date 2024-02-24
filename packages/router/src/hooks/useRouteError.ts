import { useContext } from 'react'

import { ErrorContext } from '../contexts/ErrorProvider.js'

export function useRouteError<T extends Error>() {
  return useContext(ErrorContext).routeError as T | undefined
}
