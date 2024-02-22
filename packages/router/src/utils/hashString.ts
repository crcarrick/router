import { default as _jsSHA } from 'jssha'

// jssha types don't work in esm
interface JSSHA {
  new (variant: string, input: string, format: { encoding: string }): this
  getHash: (format: string) => string
  update: (message: string) => void
}

const jsSHA = _jsSHA as unknown as JSSHA

export function hashString(id: string) {
  // synchronous hash function (SubtleCrypto is async)
  const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' })
  shaObj.update(id)
  return shaObj.getHash('HEX')
}
