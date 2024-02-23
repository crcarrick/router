import { useContext } from 'react'

import { ErrorContext } from '../contexts/ErrorProvider.js'

export function useAsyncError<T extends Error>() {
  return useContext(ErrorContext).asyncError as T
}
