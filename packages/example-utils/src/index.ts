export function resolve<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms)
  })
}

export function reject(error: unknown, ms: number): Promise<unknown> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(error), ms)
  })
}
