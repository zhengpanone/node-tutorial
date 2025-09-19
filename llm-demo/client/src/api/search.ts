import instance from "../request/index"

export function search(data: Record<string, string>) {
  return instance.post('/search', data, {
    responseType: 'stream'
  })
}