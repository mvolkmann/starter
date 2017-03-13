type ParamsType = {
  name: string,
  description: string
};

export function getUrl(
  path: string,
  queryParams: ParamsType,
  BASE_URL: string = 'https://localhost',
) {
  if (!queryParams) return `${BASE_URL}/${path}`;

  let queryString = '';
  for (const key of Object.keys(queryParams).sort()) {
    queryString += `&${key}=${queryParams[key]}`;
  }

  return `${BASE_URL}/${path}?${queryString.substring(1)}`;
}

