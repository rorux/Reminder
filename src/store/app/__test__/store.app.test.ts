import { appSelector } from '../selectors';
import appReducer from '../reducer';
import { rootStateForTesting } from '@store/types';
import { AppActionTypes } from '../types';
import { modalOpenAction, drawerToggleAction, modalCloseAction } from '../actions';

describe('App selector testing', () => {
  it('Should generate correct selector', () => {
    expect(appSelector(rootStateForTesting)).toEqual({
      isDrawerOpen: false,
      isModalRecordsOpen: false,
      modalRecords: [],
      modalDate: null,
    });
  });
});

const initialState = {
  isDrawerOpen: false,
  isModalRecordsOpen: false,
  modalRecords: [],
  modalDate: null,
};

const record = {
  id: '1',
  title: 'title of monthly remind',
  period: 'monthly',
  monthday: '8',
  holidays: 'afterHoliday',
  days: [1642366800000, 1644872400000],
};

describe('App reducer testing', () => {
  it('DRAWER_TOGGLE', () => {
    expect(
      appReducer(initialState, {
        type: AppActionTypes.DRAWER_TOGGLE,
      })
    ).toEqual({
      isDrawerOpen: true,
      isModalRecordsOpen: false,
      modalRecords: [],
      modalDate: null,
    });
  });

  it('MODAL_CLOSE', () => {
    expect(
      appReducer(initialState, {
        type: AppActionTypes.MODAL_CLOSE,
      })
    ).toEqual({
      isDrawerOpen: false,
      isModalRecordsOpen: false,
      modalRecords: [],
      modalDate: null,
    });
  });

  it('MODAL_OPEN', () => {
    expect(
      appReducer(initialState, {
        type: AppActionTypes.MODAL_OPEN,
        payload: {
          records: [record],
          date: 123,
        },
      })
    ).toEqual({
      isDrawerOpen: false,
      isModalRecordsOpen: true,
      modalRecords: [record],
      modalDate: 123,
    });
  });
});

describe('App actions testing', () => {
  it('drawerToggleAction', () => {
    expect(drawerToggleAction()).toEqual({
      type: AppActionTypes.DRAWER_TOGGLE,
    });
  });
  it('modalOpenAction', () => {
    expect(
      modalOpenAction({
        records: [record],
        date: 123,
      })
    ).toEqual({
      type: AppActionTypes.MODAL_OPEN,
      payload: {
        records: [record],
        date: 123,
      },
    });
  });

  it('modalCloseAction', () => {
    expect(modalCloseAction()).toEqual({
      type: AppActionTypes.MODAL_CLOSE,
    });
  });
});
