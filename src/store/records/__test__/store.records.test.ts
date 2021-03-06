import firebase from 'firebase';
import {
  addRecordWithFirebase,
  getRecordFromFirebase,
  changeRecordWithFirebase,
  deleteRecordWithFirebase,
  initRecords,
} from '../actions';
import { recordsSelector } from '../selectors';
import { rootStateForTesting } from '@store/types';
import { RecordsActionTypes } from '../types';
import recordsReducer from '../reducer';

const dispatch = jest.fn();

const set = jest.fn();
const on_ = jest.fn();
const child = jest.fn(() => ({
  set,
  on: on_,
  remove: jest.fn(),
}));
const on = jest.fn();
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
            child,
            on,
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
  it('addRecordWithFirebase should call firebase methods', () => {
    const record = {
      id: '1',
      title: 'title of monthly remind',
      period: 'monthly',
      monthday: '8',
      holidays: 'afterHoliday',
      days: [1642366800000, 1644872400000],
    };

    addRecordWithFirebase(record)();
    expect(firebase.auth).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith(record);
  });

  it('changeRecordWithFirebase should call firebase methods', () => {
    const record = {
      id: '1',
      title: 'title of monthly remind',
      period: 'monthly',
      monthday: '8',
      holidays: 'afterHoliday',
      days: [1642366800000, 1644872400000],
    };

    changeRecordWithFirebase(record)();
    expect(firebase.auth).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith(record);
  });

  it('deleteRecordWithFirebase should call firebase methods', () => {
    const id = '123';

    deleteRecordWithFirebase(id)();
    expect(firebase.auth).toHaveBeenCalled();
    expect(child).toHaveBeenCalledWith(id);
  });

  it('initRecords action creator', () => {
    initRecords()(dispatch);
    expect(firebase.auth).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({ type: RecordsActionTypes.RECORDS_INIT });
    expect(on).toHaveBeenCalled();
    expect(on.mock.calls[0][0]).toBe('value');
  });

  it('getRecordFromFirebase action creator', () => {
    const id = '123';
    getRecordFromFirebase(id)();
    expect(firebase.auth).toHaveBeenCalled();
    expect(on_).toHaveBeenCalled();
    expect(on_.mock.calls[0][0]).toBe('value');
  });
});

describe('Records selector testing', () => {
  it('Should generate correct selector', () => {
    expect(recordsSelector(rootStateForTesting)).toEqual({
      recordList: [],
      loading: false,
      error: null,
    });
  });
});

const initialState = {
  recordList: [],
  error: null,
  loading: false,
};

const record = {
  id: '1',
  title: 'title of monthly remind',
  period: 'monthly',
  monthday: '8',
  holidays: 'afterHoliday',
  days: [1642366800000, 1644872400000],
};

describe('Records reducer testing', () => {
  it('RECORDS_INIT', () => {
    expect(
      recordsReducer(initialState, {
        type: RecordsActionTypes.RECORDS_INIT,
      })
    ).toEqual({
      recordList: [],
      error: null,
      loading: true,
    });
  });

  it('RECORDS_SUCCESS', () => {
    expect(
      recordsReducer(initialState, {
        type: RecordsActionTypes.RECORDS_SUCCESS,
        payload: [record],
      })
    ).toEqual({
      recordList: [record],
      error: null,
      loading: false,
    });
  });

  it('RECORDS_ERROR', () => {
    expect(
      recordsReducer(initialState, {
        type: RecordsActionTypes.RECORDS_ERROR,
        payload: 'Error',
      })
    ).toEqual({
      recordList: [],
      error: 'Error',
      loading: false,
    });
  });
});
