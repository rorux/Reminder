import { IRecordsState, IRecordsInitAction, RecordsActionTypes } from './types';

const initialState: IRecordsState = {
  recordList: [],
};

export default function recordsReducer(
  state = initialState,
  action: IRecordsInitAction
  // action: TRegisterAction | TLoginAction | LogoutAction | ClearErrorAction
) {
  switch (action.type) {
    case RecordsActionTypes.RECORDS_INIT:
      return {
        ...state,
        recordList: action.payload,
      };
    default:
      return state;
  }
}
