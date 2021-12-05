import { CHANGE_USER_NAME_ACTION } from './constants';

const initialState = {
  userName: '',
};

export const profileReducer = (store = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_USER_NAME_ACTION:
      return {
        ...store,
        userName: action.payload,
      };
    default: {
      return store;
    }
  }
};
