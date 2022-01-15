import firebase from 'firebase';
import { profileSelector } from '../selectors';
import profileducer from '../reducer';
import { rootStateForTesting } from '@store/types';
import { ProfileActionTypes } from '../types';
import { getProfileFromFirebase, changeProfileWithFirebase } from '../actions';

const dispatch = jest.fn();

const set = jest.fn();
const on = jest.fn();
const child = jest.fn(() => ({
  set,
  on,
}));
jest.mock('firebase', () => {
  return {
    auth: jest.fn().mockReturnThis(),
    currentUser: {
      email: 'bob@mail.ru',
      uid: '789',
    },
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        child: jest.fn(() => ({
          child,
        })),
      })),
    })),
  };
});

describe('Profile selector testing', () => {
  it('Should generate correct selector', () => {
    expect(profileSelector(rootStateForTesting)).toEqual({
      userName: null,
      loading: false,
      error: null,
    });
  });
});

const initialState = {
  userName: null,
  loading: false,
  error: null,
};

describe('Profile reducer testing', () => {
  it('PROFILE_INIT', () => {
    expect(
      profileducer(initialState, {
        type: ProfileActionTypes.PROFILE_INIT,
      })
    ).toEqual({
      userName: null,
      loading: true,
      error: null,
    });
  });

  it('PROFILE_SUCCESS', () => {
    expect(
      profileducer(initialState, {
        type: ProfileActionTypes.PROFILE_SUCCESS,
        payload: { userName: 'Иван' },
      })
    ).toEqual({
      userName: 'Иван',
      loading: false,
      error: null,
    });
  });

  it('PROFILE_ERROR', () => {
    expect(
      profileducer(initialState, {
        type: ProfileActionTypes.PROFILE_ERROR,
        payload: 'Ошибка',
      })
    ).toEqual({
      userName: null,
      loading: false,
      error: 'Ошибка',
    });
  });
});

describe('Profile actions testing', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('getProfileFromFirebase should call firebase methods', () => {
    getProfileFromFirebase()(dispatch);
    expect(firebase.auth).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({ type: ProfileActionTypes.PROFILE_INIT });
    expect(on).toHaveBeenCalled();
    expect(on.mock.calls[0][0]).toBe('value');
  });

  it('changeProfileWithFirebase should call firebase methods', () => {
    const profile = { userName: 'Иван' };
    changeProfileWithFirebase(profile)();
    expect(firebase.auth).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith(profile);
  });
});
