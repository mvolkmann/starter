// @flow

type ResponseType = {
  message?: string,
  status: number
};

export function handleError(url: string, res: ResponseType): void {
  console.error('error.js handleError: res =', res);
  const error = res.status === 440 ? 'Session Timeout' : res.message;
  window.setState({error});
}
