import type { BrowserHistory } from 'history'
import type { ComponentType } from 'react'
import { L, O, S } from 'ts-toolbelt'

declare const brand: unique symbol

type Branded<T, K extends string> = T & { [brand]: K }

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
  (params: PathParams<T>): any
}

interface RouteComponentProps<T extends string, U> {
  data: U
  params: PathParams<T>
}

type RouteComponent<T extends string, U> = ComponentType<
  RouteComponentProps<T, U>
>

export type RouteObject<T extends string, U extends Loader<any> = Loader<T>> = {
  path: T
  loader?: U
  // TODO: use the return type of the loader as the data type
  component: NoInfer<RouteComponent<T, ReturnType<U>>>
  // TODO: it would be sick if the children loaders could get the parent params
  children?: RouteObject<any>[]
}

export type Route<T extends string> = Branded<RouteObject<T>, 'RouteObject'>

export type BrowserRouter<T extends string> = Branded<
  {
    routes: Array<Route<T>>
    history: BrowserHistory
  },
  'BrowserRouter'
>
