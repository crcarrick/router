import { L, O, S } from 'ts-toolbelt'

type Segments<T extends string> = L.Filter<S.Split<T, '/'>, ''>
type ParamsList<T extends readonly string[]> = L.Filter<
  L.Select<T, `:${string}`>,
  ':'
>
type Params<T extends readonly string[]> = T extends [
  infer Head,
  ...infer Tail extends readonly string[],
]
  ? Head extends `:${infer P}`
    ? O.Merge<{ [K in P]: string }, Params<Tail>>
    : Params<Tail>
  : {}

export type PathParams<T extends string> = Params<ParamsList<Segments<T>>>

export interface Loader<T extends string> {
  (params: PathParams<T>): unknown
}

export interface RouteObject<T extends string> {
  path: T
  element: JSX.Element
  loader?: Loader<T>
  children?: RouteObject<any>[]
}

export type RouteObjects<T extends string> = Array<
  {
    [K in T]: RouteObject<K>
  }[T]
>
