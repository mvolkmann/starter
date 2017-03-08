// @flow

type ResponseType = {
  message: string,
  status: number
};

export function handleError(url: string, res: ResponseType) {
  window.setState(
    res.status === 440 ?
      {error: 'Session Timeout', route: 'login'} :
      {error: res.message},
  );
}
