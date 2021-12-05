import { ADD_TASK_ACTION, DELETE_TASK_ACTION, CHANGE_TASK_ACTION } from './constants';

const initialState = {
  taskList: {},
};

export const tasksReducer = (store = initialState, action: any) => {
  switch (action.type) {
    case ADD_TASK_ACTION:
      return store;
    case DELETE_TASK_ACTION:
      return store;
    case CHANGE_TASK_ACTION:
      return store;
    default: {
      return store;
    }
  }
};
