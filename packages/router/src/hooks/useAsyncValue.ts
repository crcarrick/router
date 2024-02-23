import { useContext } from 'react'

import { AwaitContext } from '../contexts/AwaitProvider.js'

export function useAsyncValue<T>() {
  return useContext(AwaitContext).value as T
}
