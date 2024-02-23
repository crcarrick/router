import { useOutlet } from '../hooks/useOutlet.js'

export function Outlet() {
  const outlet = useOutlet()
  return outlet
}
