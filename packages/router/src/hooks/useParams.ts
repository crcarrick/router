import { useContext } from 'react'

import { ParamsContext, type Params } from '../contexts/ParamsProvider.js'

export function useParams<T extends Params<any>>() {
  return useContext(ParamsContext).params as T
}
