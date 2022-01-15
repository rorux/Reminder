import { IAuthState } from './auth/types';
import { IAppState } from './app/types';
import { IRecordsState } from './records/types';
import { IProfileState } from './profile/types';

export interface IRootState {
  auth: IAuthState;
  app: IAppState;
  records: IRecordsState;
  profile: IProfileState;
}

export const rootStateForTesting = {
  auth: { error: null, user: null },
  app: { isDrawerOpen: false, isModalRecordsOpen: false, modalRecords: [], modalDate: null },
  records: { recordList: [], loading: false, error: null },
  profile: { userName: null, loading: false, error: null },
};
