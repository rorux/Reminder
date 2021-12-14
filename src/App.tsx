import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';
import Router from './router/Router';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(null);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router authed={authed} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
