import { OutletContextProvider } from '../contexts/OutletContextProvider.js'
import { useOutlet } from '../hooks/useOutlet.js'

export interface OutletProps {
  context?: unknown
}

export function Outlet({ context }: OutletProps) {
  return (
    <OutletContextProvider context={context}>
      {useOutlet()}
    </OutletContextProvider>
  )
}
