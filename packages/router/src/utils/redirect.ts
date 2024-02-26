export function redirect(to: string, init: ResponseInit = {}) {
  const initHeaders = init.headers ?? {}
  return new Response('', {
    ...init,
    status: 302,
    headers: {
      ...initHeaders,
      Location: to,
    },
  })
}
