import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

const user = false;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router authed={user} />
    </BrowserRouter>
  );
};

export default App;
