// @flow
import {setState} from './state-util';

type ResponseType = {
  message?: string,
  status: number
};

export function handleError(url: string, res: ResponseType): void {
  const error = res.status === 440 ? 'Session Timeout' : res.message;
  setState({error});
}
