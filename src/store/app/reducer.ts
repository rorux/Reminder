import { IAppState, AppActionTypes, IDrawerToggleAction } from './types';

const initialState: IAppState = {
  isDrawerOpen: false,
};

export default function appReducer(state = initialState, action: IDrawerToggleAction) {
  switch (action.type) {
    case AppActionTypes.DRAWER_TOGGLE:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    default:
      return state;
  }
}
