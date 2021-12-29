import { IAuthState } from './auth/types';
import { IAppState } from './app/types';
import { IRecordsState } from './records/types';

export interface IRootState {
  auth: IAuthState;
  app: IAppState;
  records: IRecordsState;
}

export const rootStateForTesting = {
  auth: { error: null, user: null },
  app: { isDrawerOpen: false },
  records: { recordList: [] },
};
