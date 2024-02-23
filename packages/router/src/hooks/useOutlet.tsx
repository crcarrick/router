import { useContext } from 'react'

import { OutletContext } from '../contexts/OutletProvider.js'
import { renderMatches } from '../utils/renderMatches.js'

import { useLocation } from './useLocation.js'

export function useOutlet() {
  const route = useContext(OutletContext).route
  const location = useLocation()

  if (!route) return null

  return renderMatches(route, location.pathname)
}
