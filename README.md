# Router 🚂

React router clone. Currently, this is duct-taped together.. don't judge me.

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-DCFF50?style=for-the-badge&logo=codesandbox)](https://githubbox.com/crcarrick/router)

## Development

#### Setup

```shell
git clone git@github.com:crcarrick/router.git
cd router
pnpm install
```

#### Generate package

```shell
pnpm generate:package
```

#### Build / watch packages

```shell
pnpm watch
```

## Examples

You should be able to swap the import in `App.tsx` for any given example from `@crcarrick/router` to `react-router-dom` and see (almost)
the same behavior for any features marked with a ✅ below.

#### Create example

```shell
pnpm generate:example
```

#### Run example

```shell
# example named 01_basic
pnpm examples:start:01_basic
```

## Features to copy

```
✅ -- done
🤔 -- partially done

- createBrowserRouter ✅
- createHashRouter
- createMemoryRouter
- createStaticHandler
- createStaticRouter
- RouterProvider ✅
- StaticRouterProvider
- BrowserRouter
- HashRouter
- MemoryRouter
- NativeRouter
- Router
- StaticRouter
- Route
- action
- errorElement ✅
- hydrateFallbackElement
- lazy
- loader ✅
- shouldRevalidate
- Await ✅
- Form
- Link ✅
- NavLink
- Navigate
- Outlet ✅
- Route
- Routes
- ScrollRestoration
- useActionData
- useAsyncError ✅
- useAsyncValue ✅
- useBeforeUnload ✅
- useBlocker
- useFetcher
- useFetchers
- useFormAction
- useHref
- useInRouterContext ✅
- useLinkClickHandler
- useLinkPressHandler
- useLoaderData ✅
- useLocation ✅
- useMatch ✅
- useMatches ✅
- useNavigate ✅
- useNavigation
- useNavigationType ✅
- useOutlet ✅
- useOutletContext ✅
- useParams ✅
- unstable_usePrompt
- useResolvedPath
- useRevalidator
- useRouteError ✅
- useRouteLoaderData ✅
- useRoutes ✅
- useSearchParams ✅
- useSubmit
- unstable_useViewTransitionState
- json ✅
- redirect ✅
- redirectDocument ✅
- createRoutesFromChildren
- createRoutesFromElements
- createSearchParams
- defer ✅
- generatePath
- isRouteErrorResponse
- Location
- matchPath
- matchRoutes ✅
- renderMatches ✅
- resolvePath
```
