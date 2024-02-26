import { redirect } from './redirect.js'

export function redirectDocument(to: string, init: ResponseInit = {}) {
  return redirect(to, {
    ...init,
    headers: {
      'X-Redirect-Document': 'true',
    },
  })
}
