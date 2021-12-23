export type IAppState = {
  isDrawerOpen: boolean;
};

export enum AppActionTypes {
  DRAWER_TOGGLE = 'APP::DRAWER_TOGGLE',
}

export interface IDrawerToggleAction {
  type: AppActionTypes.DRAWER_TOGGLE;
}
