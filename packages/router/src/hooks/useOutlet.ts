import { useContext } from 'react'

import { OutletContext } from '../contexts/OutletProvider.js'
import { renderMatches } from '../utils/renderMatches.js'

export function useOutlet() {
  const matches = useContext(OutletContext).matches

  if (!matches) return null

  return renderMatches(matches)
}
