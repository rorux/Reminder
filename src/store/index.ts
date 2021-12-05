import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { profileReducer } from './profile/reducer';
import { tasksReducer } from './tasks/reducer';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    tasks: tasksReducer,
  }),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
