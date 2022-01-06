import { IAppState, AppActionTypes, TAppAction } from './types';

const initialState: IAppState = {
  isDrawerOpen: false,
  isModalRecordsOpen: false,
  modalRecords: [],
  modalDate: null,
};

export default function appReducer(state = initialState, action: TAppAction) {
  switch (action.type) {
    case AppActionTypes.DRAWER_TOGGLE:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    case AppActionTypes.MODAL_CLOSE:
      return {
        ...state,
        isModalRecordsOpen: false,
        modalRecords: [],
        modalDate: null,
      };
    case AppActionTypes.MODAL_OPEN:
      return {
        ...state,
        isModalRecordsOpen: true,
        modalRecords: action.payload.records,
        modalDate: action.payload.date,
      };
    default:
      return state;
  }
}
