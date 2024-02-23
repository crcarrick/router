import { getJsSHA } from './jsSHA.js'

export function hashString(id: string) {
  const shaObj = getJsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' })
  shaObj.update(id)
  return shaObj.getHash('HEX')
}
