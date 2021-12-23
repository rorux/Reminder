import { AppActionTypes, IDrawerToggleAction } from './types';

export const drawerToggleAction = (): IDrawerToggleAction => ({
  type: AppActionTypes.DRAWER_TOGGLE,
});
