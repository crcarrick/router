import React from 'react'

import { ErrorContext } from '../contexts/ErrorProvider.js'

export interface RouteErrorBoundaryProps {
  children: React.ReactNode
  errorElement?: React.ReactNode
}

export interface RouteErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class RouteErrorBoundary extends React.Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  declare context: React.ContextType<typeof ErrorContext>
  static contextType = ErrorContext

  state = { hasError: false, error: null }
  constructor(props: RouteErrorBoundaryProps) {
    super(props)
  }

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo): void {
    this.context.setRouteError(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.errorElement ?? (
          <div>
            An error occurred... {JSON.stringify(this.state.error, null, 2)}
          </div>
        )
      )
    }

    return this.props.children
  }
}
