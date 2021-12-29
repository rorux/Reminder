import firebase from 'firebase';
import { addRecordWithFirebase } from '../actions';
import { recordsSelector } from '../selectors';
import { rootStateForTesting } from '@store/types';

const set = jest.fn();
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
          child: jest.fn(() => ({
            child: jest.fn(() => ({
              set,
            })),
          })),
        })),
      })),
    })),
  };
});

describe('Records actions testing', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('addRecordWithFirebase should call firebase methods', async () => {
    const record = {
      id: '1',
      title: 'title of monthly remind',
      period: 'monthly',
      monthday: '8',
      holidays: 'afterHoliday',
      days: [1642366800000, 1644872400000],
    };

    await addRecordWithFirebase(record)();
    expect(firebase.auth).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith(record);
  });
});

// describe('Auth reducer testing', () => {
//   it('REGISTER_SUCCESS', () => {
//     const initialState = {
//       error: 'error',
//       user: null,
//     };
//     expect(
//       authReducer(initialState, {
//         type: AuthActionTypes.REGISTER_SUCCESS,
//         payload: null,
//       })
//     ).toEqual({
//       error: null,
//       user: null,
//     });
//   });
//   it('LOGIN_SUCCESS', () => {
//     const initialState = {
//       error: 'error',
//       user: null,
//     };
//     expect(
//       authReducer(initialState, {
//         type: AuthActionTypes.LOGIN_SUCCESS,
//         payload: null,
//       })
//     ).toEqual({
//       error: null,
//       user: null,
//     });
//   });
//   it('REGISTER_FAILURE', () => {
//     const initialState = {
//       error: null,
//       user: null,
//     };
//     expect(
//       authReducer(initialState, {
//         type: AuthActionTypes.REGISTER_FAILURE,
//         payload: 'error',
//       })
//     ).toEqual({
//       error: 'error',
//       user: null,
//     });
//   });
//   it('LOGIN_FAILURE', () => {
//     const initialState = {
//       error: null,
//       user: null,
//     };
//     expect(
//       authReducer(initialState, {
//         type: AuthActionTypes.LOGIN_FAILURE,
//         payload: 'error',
//       })
//     ).toEqual({
//       error: 'error',
//       user: null,
//     });
//   });
//   it('LOGOUT', () => {
//     const initialState = {
//       error: 'error',
//       user: null,
//     };
//     expect(
//       authReducer(initialState, {
//         type: AuthActionTypes.LOGOUT,
//         payload: null,
//       })
//     ).toEqual({
//       error: null,
//       user: null,
//     });
//   });
//   it('CLEAR_ERROR', () => {
//     const initialState = {
//       error: 'error',
//       user: null,
//     };
//     expect(
//       authReducer(initialState, {
//         type: AuthActionTypes.CLEAR_ERROR,
//       })
//     ).toEqual({
//       error: null,
//       user: null,
//     });
//   });
// });

describe('Records selector testing', () => {
  it('Should generate correct selector', () => {
    expect(recordsSelector(rootStateForTesting)).toEqual({ recordList: [] });
  });
});
