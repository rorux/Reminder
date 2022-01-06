import { TRecord } from '@store/records/types';

export type IAppState = {
  isDrawerOpen: boolean;
  isModalRecordsOpen: boolean;
  modalRecords: Array<TRecord>;
  modalDate: number | null;
};

export enum AppActionTypes {
  DRAWER_TOGGLE = 'APP::DRAWER_TOGGLE',
  MODAL_OPEN = 'APP::MODAL_OPEN',
  MODAL_CLOSE = 'APP::MODAL_CLOSE',
}

export interface IDrawerToggleAction {
  type: AppActionTypes.DRAWER_TOGGLE;
}

export interface IModalOpenAction {
  type: AppActionTypes.MODAL_OPEN;
  payload: { records: Array<TRecord>; date: number };
}

export interface IModalCloseAction {
  type: AppActionTypes.MODAL_CLOSE;
}

export type TAppAction = IDrawerToggleAction | IModalOpenAction | IModalCloseAction;
