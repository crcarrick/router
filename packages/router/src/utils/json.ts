export function json(value: unknown) {
  return new Response(JSON.stringify(value), {
    headers: {
      'Content-Type': 'application/json; utf-8',
    },
  })
}
