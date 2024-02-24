import { useContext } from 'react'

import { ParamsContext } from '../contexts/ParamsProvider.js'
import type { Params } from '../types.js'

export function useParams<T extends Params<any>>() {
  return useContext(ParamsContext).params as T
}
