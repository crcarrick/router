import type { BrowserHistory } from 'history'
import { L, O, S } from 'ts-toolbelt'

declare const brand: unique symbol

type Branded<T, K extends string> = T & { [brand]: K }

type Segments<T extends string> = L.Filter<S.Split<T, '/'>, ''>
type ParamsList<T extends readonly string[]> = L.Filter<
  L.Select<T, `:${string}`>,
  ':'
>
type Params<T extends readonly string[]> = T extends [
  infer Head extends string,
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

interface RouteComponentProps {}

type RouteComponent = React.ComponentType<RouteComponentProps>

export type RouteObject<T extends string> = {
  id?: string
  path: T
  loader?: Loader<T>
  element?: React.ReactNode
  Component?: RouteComponent
  children?: Route<any>[]
}

export type Route<T extends string> = Branded<
  O.Merge<{ id: string; full: string }, RouteObject<T>>,
  'RouteObject'
>

export type BrowserRouter<T extends string> = Branded<
  {
    routes: Array<Route<T>>
    history: BrowserHistory
  },
  'BrowserRouter'
>

export type LoaderData<T extends (...args: any[]) => any> =
  ReturnType<T> extends Promise<infer U>
    ? U | undefined
    : ReturnType<T> | undefined
