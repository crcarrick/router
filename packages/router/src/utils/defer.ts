class Deferred<T> {
  public status: 'pending' | 'resolved' | 'rejected' = 'pending'
  public value: T | undefined
  public error: unknown

  constructor(public promise: Promise<T>) {
    this.promise.then(
      (value) => {
        this.status = 'resolved'
        this.value = value
      },
      (error: unknown) => {
        this.status = 'rejected'
        this.error = error
      },
    )
  }
}

type Resource<T> = { read(): T } & {}

function createResource<T>(deferred: Deferred<T>): Resource<T> {
  return {
    read() {
      switch (deferred.status) {
        case 'pending':
          throw deferred.promise
        case 'resolved':
          return deferred.value as T
        case 'rejected':
          throw deferred.error
      }
    },
  }
}

type DeferredResult<T> = { [K in keyof T]: Resource<Awaited<T[K]>> } & {}

export function defer<const T extends Record<string, any>>(
  values: T,
): DeferredResult<T> {
  const result = {} as DeferredResult<T>
  for (const key in values) {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      result[key] = createResource(new Deferred(values[key]))
    }
  }

  return result
}
