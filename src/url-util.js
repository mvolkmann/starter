type ParamsType = {
  name: string,
  description: string
};

export default function getUrl(
  path: string,
  queryParams: ParamsType,
  BASE_URL: string = 'https://localhost',
) {
  if (!queryParams) return `${BASE_URL}/${path}`;
  const queryKeys = Object.keys(queryParams);
  let queryString;
  for (const i in queryKeys) {
    if (i < queryKeys.length - 1) {
      queryString += `${queryKeys[i]}&`;
    } else {
      queryString += queryKeys[i];
    }
  }

  console.log({BASE_URL, path, queryString});
  return `${BASE_URL}/${path}?${queryString}`;
}
