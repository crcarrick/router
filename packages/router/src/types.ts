import type { BrowserHistory } from 'history'
import { MatchFunction } from 'path-to-regexp'
import { L, O, S } from 'ts-toolbelt'

declare const brand: unique symbol

type Branded<T, K extends string> = T & { [brand]: K }

type Segments<T extends string> = L.Filter<S.Split<T, '/'>, ''>
type ParamsList<T extends readonly string[]> = L.Filter<
  L.Select<T, `:${string}`>,
  ':'
>
export type PathParams<T extends string> =
  ParamsList<Segments<T>> extends [
    infer Head extends string,
    ...infer Tail extends readonly string[],
  ]
    ? Head extends `:${infer P}`
      ? O.Merge<{ [K in P]: string }, Params<Tail>>
      : Params<Tail>
    : {}
export type Params<T> = Readonly<Partial<T>>

export interface LoaderFunction {
  (params: Params<any>): unknown
}

interface RouteComponentProps {}

type RouteComponent = React.ComponentType<RouteComponentProps>

export type RouteObject = {
  id?: string
  path: string
  exact?: boolean
  loader?: LoaderFunction
  handle?: Record<string, unknown>
  element?: React.ReactNode
  Component?: RouteComponent
  errorElement?: React.ReactElement
  ErrorBoundary?: React.ComponentType
  children?: RouteObject[]
}

interface RouteAdditions {
  id: string
  full: string
  children: Route[]
}

export type Route = Branded<O.Merge<RouteAdditions, RouteObject>, 'RouteObject'>

export type BrowserRouter = Branded<
  {
    routes: Route[]
    history: BrowserHistory
  },
  'BrowserRouter'
>

export type LoaderData<T extends (...args: any[]) => any> =
  ReturnType<T> extends Promise<infer U>
    ? U | undefined
    : ReturnType<T> | undefined

export interface Match {
  route: Route
  params: Params<any>
  pathname: string
}

export interface PathMatch<T extends string> {
  params: PathParams<T>
  pathname: string
  pattern: {
    path: T
    matcher: MatchFunction<PathParams<T>>
  }
}

export interface RouteMatch {
  route: Route
  params: PathParams<string>
  pathname: string
}
