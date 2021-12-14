import firebase from 'firebase';

export type TAuthData = {
  firstName?: string;
  email: string;
  password: string;
};

export interface IAuthState {
  error: string | null;
  user: firebase.User | null;
}

export enum AuthActionTypes {
  REGISTER_SUCCESS = 'AUTH::REGISTER_SUCCESS',
  LOGIN_SUCCESS = 'AUTH::LOGIN_SUCCESS',
  REGISTER_FAILURE = 'AUTH::REGISTER_FAILURE',
  LOGIN_FAILURE = 'AUTH::LOGIN_FAILURE',
  LOGOUT = 'AUTH::LOGOUT',
  CLEAR_ERROR = 'AUTH::CLEAR_ERROR',
}

interface RegisterSuccessAction {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: firebase.User | null;
}

interface RegisterFailureAction {
  type: AuthActionTypes.REGISTER_FAILURE;
  payload: string;
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: firebase.User | null;
}

interface LoginFailureAction {
  type: AuthActionTypes.LOGIN_FAILURE;
  payload: string;
}

export interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
  payload: firebase.User | null;
}

export interface ClearErrorAction {
  type: AuthActionTypes.CLEAR_ERROR;
}

export type TRegisterAction = RegisterSuccessAction | RegisterFailureAction;
export type TLoginAction = LoginSuccessAction | LoginFailureAction;
