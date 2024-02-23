import jsSHA, { default as _jsSHA } from 'jssha'

// jssha types don't work in esm
type Variant =
  | 'SHA-1'
  | 'SHA-224'
  | 'SHA-256'
  | 'SHA-384'
  | 'SHA-512'
  | 'SHA3-224'
  | 'SHA3-256'
  | 'SHA3-384'
  | 'SHA3-512'
  | 'SHAKE128'
  | 'SHAKE256'
type Format = 'HEX' | 'B64' | 'BYTES' | 'UINT8ARRAY' | 'ARRAYBUFFER' | 'TEXT'
type Options<T extends Format> = T extends 'TEXT'
  ? { encoding?: 'UTF8' | 'UTF16LE' | 'UTF16BE' }
  : never
type FormatToHashType = {
  B64: string
  HEX: string
  TEXT: string
  BYTES: string
  UINT8ARRAY: Uint8Array
  ARRAYBUFFER: ArrayBuffer
}
type HashType<T extends Format> = FormatToHashType[T]

interface jsSHA<T extends Format> {
  new (variant: Variant, format: T, options?: Options<T>): this
  getHash<U extends Format>(format: U): HashType<U>
  update(message: string): void
}

type CtorParameters<T> = T extends { new (...args: infer Args): any }
  ? Args
  : never

// this is disgusting
export function getJsSHA<T extends Format>(
  ...ctor: CtorParameters<jsSHA<T>>
): jsSHA<T> {
  const jsSHA = _jsSHA as unknown as jsSHA<T>
  return new jsSHA(...ctor)
}
