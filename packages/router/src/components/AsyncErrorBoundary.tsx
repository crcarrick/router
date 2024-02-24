import React from 'react'

import { ErrorContext } from '../contexts/ErrorProvider.js'

interface AsyncErrorBoundaryProps {
  children: React.ReactNode
  errorElement?: React.ReactNode
}

interface AsyncErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class AsyncErrorBoundary extends React.Component<
  AsyncErrorBoundaryProps,
  AsyncErrorBoundaryState
> {
  declare context: React.ContextType<typeof ErrorContext>
  static contextType = ErrorContext

  state = { hasError: false, error: null }
  constructor(props: AsyncErrorBoundaryProps) {
    super(props)
  }

  static getDerivedStateFromError(error: Error): AsyncErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo): void {
    this.context.setAsyncError(error)
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
