import { TRecord } from '@store/records/types';
import { AppActionTypes, IDrawerToggleAction, IModalOpenAction, IModalCloseAction } from './types';

export const drawerToggleAction = (): IDrawerToggleAction => ({
  type: AppActionTypes.DRAWER_TOGGLE,
});

export const modalOpenAction = (payload: {
  records: Array<TRecord>;
  date: number;
}): IModalOpenAction => ({
  type: AppActionTypes.MODAL_OPEN,
  payload,
});

export const modalCloseAction = (): IModalCloseAction => ({
  type: AppActionTypes.MODAL_CLOSE,
});
