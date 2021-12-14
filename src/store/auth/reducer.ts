import {
  IAuthState,
  AuthActionTypes,
  TRegisterAction,
  TLoginAction,
  LogoutAction,
  ClearErrorAction,
} from './types';

const initialState: IAuthState = {
  error: null,
  user: null,
};

export default function authReducer(
  state = initialState,
  action: TRegisterAction | TLoginAction | LogoutAction | ClearErrorAction
) {
  switch (action.type) {
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
      return { error: null, user: action.payload };
    case AuthActionTypes.REGISTER_FAILURE:
    case AuthActionTypes.LOGIN_FAILURE:
      return { error: action.payload, user: null };
    case AuthActionTypes.LOGOUT:
      return { error: null, user: null };
    case AuthActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
