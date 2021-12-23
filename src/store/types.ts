import { IAuthState } from './auth/types';
import { IAppState } from './app/types';

export interface IRootState {
  auth: IAuthState;
  app: IAppState;
}
