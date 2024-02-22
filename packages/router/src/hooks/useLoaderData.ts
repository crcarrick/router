import { useContext } from 'react'

import { LoaderDataContext } from '../contexts/LoaderDataProvider.js'

export function useLoaderData<T>(): T | undefined {
  return useContext(LoaderDataContext).loaderData as T | undefined
}
