import { useContext } from 'react'

import { OutletContextContext } from '../contexts/OutletContextProvider.js'

export function useOutletContext<T>() {
  return useContext(OutletContextContext).context as T
}
