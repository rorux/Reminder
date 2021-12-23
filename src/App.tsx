import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';
import Router from './router/Router';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setAuthed(true);
          setIsLoaded(true);
        } else {
          setAuthed(null);
          setIsLoaded(true);
        }
      });
    }
    checkAuth();
  }, []);

  return (
    <Provider store={store}>
      {isLoaded && (
        <BrowserRouter>
          <Router authed={authed} />
        </BrowserRouter>
      )}
    </Provider>
  );
};

export default App;
