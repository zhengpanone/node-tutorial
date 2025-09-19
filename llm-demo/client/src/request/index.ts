const BASE_URL = 'http://localhost:3000';

interface Headers {
  [key: string]: string;
}

const formatParams = (params: Record<string, string>) => {
  return Object.keys(params).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
}

const instance = {
  get(url: string, params: Record<string, string>, headers: Headers) {
    return fetch(`${BASE_URL}${url}?${formatParams(params)}`, {
      method: 'GET',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, headers),
    })
  },
  post(url: string, data: Record<string, string>, headers: Headers) {
    return fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, headers),
      body: JSON.stringify(data)
    })
  }
}

export default instance;