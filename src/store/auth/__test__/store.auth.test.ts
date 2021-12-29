import firebase from 'firebase';
import {
  authRegisterAction,
  authLoginAction,
  authLogoutAction,
  authClearErrorAction,
} from '../actions';
import { AuthActionTypes } from '../types';
import authReducer from '../reducer';
import { authSelector } from '../selectors';
import { rootStateForTesting } from '@store/types';

const dispatch = jest.fn();

jest.mock('firebase', () => {
  return {
    auth: jest.fn().mockReturnThis(),
    currentUser: {
      email: 'bob@mail.ru',
      uid: '789',
    },
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        child: jest.fn(() => ({
          child: jest.fn(() => ({
            set: jest.fn(),
          })),
        })),
      })),
    })),
  };
});

describe('Auth actions testing', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('authRegisterAction should create a new user on firebase', async () => {
    const email = 'test@mail.ru';
    const password = '123456';
    await authRegisterAction({ email, password })(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        email: 'bob@mail.ru',
        uid: '789',
      },
      type: AuthActionTypes.REGISTER_SUCCESS,
    });
    expect(firebase.auth).toHaveBeenCalled();
    expect(firebase.auth().createUserWithEmailAndPassword).toBeCalledWith(email, password);
  });

  it('authLoginAction should authorize the user', async () => {
    const email = 'test@mail.ru';
    const password = '123456';
    await authLoginAction({ email, password })(dispatch);
    expect(firebase.auth).toHaveBeenCalled();
    expect(firebase.auth().signInWithEmailAndPassword).toBeCalledWith(email, password);
  });

  it('authLogoutAction should log out the user', async () => {
    await authLogoutAction()(dispatch);
    expect(firebase.auth).toHaveBeenCalled();
    expect(firebase.auth().signOut).toBeCalled();
  });

  it('authClearErrorAction', async () => {
    await authClearErrorAction()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: AuthActionTypes.CLEAR_ERROR,
    });
  });
});

describe('Auth reducer testing', () => {
  it('REGISTER_SUCCESS', () => {
    const initialState = {
      error: 'error',
      user: null,
    };
    expect(
      authReducer(initialState, {
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: null,
      })
    ).toEqual({
      error: null,
      user: null,
    });
  });
  it('LOGIN_SUCCESS', () => {
    const initialState = {
      error: 'error',
      user: null,
    };
    expect(
      authReducer(initialState, {
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: null,
      })
    ).toEqual({
      error: null,
      user: null,
    });
  });
  it('REGISTER_FAILURE', () => {
    const initialState = {
      error: null,
      user: null,
    };
    expect(
      authReducer(initialState, {
        type: AuthActionTypes.REGISTER_FAILURE,
        payload: 'error',
      })
    ).toEqual({
      error: 'error',
      user: null,
    });
  });
  it('LOGIN_FAILURE', () => {
    const initialState = {
      error: null,
      user: null,
    };
    expect(
      authReducer(initialState, {
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: 'error',
      })
    ).toEqual({
      error: 'error',
      user: null,
    });
  });
  it('LOGOUT', () => {
    const initialState = {
      error: 'error',
      user: null,
    };
    expect(
      authReducer(initialState, {
        type: AuthActionTypes.LOGOUT,
        payload: null,
      })
    ).toEqual({
      error: null,
      user: null,
    });
  });
  it('CLEAR_ERROR', () => {
    const initialState = {
      error: 'error',
      user: null,
    };
    expect(
      authReducer(initialState, {
        type: AuthActionTypes.CLEAR_ERROR,
      })
    ).toEqual({
      error: null,
      user: null,
    });
  });
});

describe('Auth selector testing', () => {
  it('Should generate correct selector', () => {
    expect(authSelector(rootStateForTesting)).toEqual({ error: null, user: null });
  });
});
