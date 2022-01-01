import { IRecordsState, TRecordsAction, RecordsActionTypes } from './types';

const initialState: IRecordsState = {
  recordList: [],
  error: null,
  loading: false,
};

export default function recordsReducer(state = initialState, action: TRecordsAction) {
  switch (action.type) {
    case RecordsActionTypes.RECORDS_INIT:
      return {
        ...state,
        loading: true,
      };
    case RecordsActionTypes.RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        recordList: action.payload,
      };
    case RecordsActionTypes.RECORDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
