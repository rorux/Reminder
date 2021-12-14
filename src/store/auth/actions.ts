import { Dispatch } from 'react';
import firebase from 'firebase';
import {
  TAuthData,
  AuthActionTypes,
  TRegisterAction,
  TLoginAction,
  LogoutAction,
  ClearErrorAction,
} from './types';

export const authRegisterAction =
  ({ firstName, email, password }: TAuthData) =>
  async (dispatch: Dispatch<TRegisterAction>) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser;
      if (currentUser !== null) {
        await firebase.database().ref('users').child(currentUser.uid).child('profile').set({
          userName: firstName,
        });
      }
      dispatch({
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: currentUser,
      });
      console.log('Регистрация окончена');
    } catch (error: any) {
      dispatch({
        type: AuthActionTypes.REGISTER_FAILURE,
        payload: error.message,
      });
    }
  };

export const authLoginAction =
  ({ email, password }: TAuthData) =>
  async (dispatch: Dispatch<TLoginAction>) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: firebase.auth().currentUser,
      });
    } catch (error: any) {
      dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };

export const authLogoutAction = () => async (dispatch: Dispatch<LogoutAction>) => {
  try {
    await firebase.auth().signOut();
    dispatch({
      type: AuthActionTypes.LOGOUT,
      payload: firebase.auth().currentUser,
    });
  } catch (error) {
    throw error;
  }
};

export const authClearErrorAction = () => async (dispatch: Dispatch<ClearErrorAction>) => {
  try {
    dispatch({
      type: AuthActionTypes.CLEAR_ERROR,
    });
  } catch (error) {
    throw error;
  }
};
