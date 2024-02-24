import { useContext } from 'react'

import { OutletContext } from '../contexts/OutletProvider.js'
import { renderMatches } from '../utils/renderMatches.js'

export function useOutlet() {
  const route = useContext(OutletContext).route

  if (!route) return null

  return renderMatches(route)
}
