import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import { Provider } from 'react-redux';
import { store } from './store';

const user = false;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router authed={user} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
