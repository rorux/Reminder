import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app/reducer';
import authReducer from './auth/reducer';
// import { profileReducer } from './profile/reducer';
// import { tasksReducer } from './tasks/reducer';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    app: appReducer,
    auth: authReducer,
    // profile: profileReducer,
    // tasks: tasksReducer,
  }),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
