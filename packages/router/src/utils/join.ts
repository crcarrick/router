export function join(...paths: string[]) {
  return paths.join('/').replace(/\/+/g, '/')
}
