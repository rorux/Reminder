import { IProfileState, TProfileAction, ProfileActionTypes } from './types';

const initialState: IProfileState = {
  userName: null,
  error: null,
  loading: false,
};

export default function recordsReducer(state = initialState, action: TProfileAction) {
  switch (action.type) {
    case ProfileActionTypes.PROFILE_INIT:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userName: action.payload.userName,
      };
    case ProfileActionTypes.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
