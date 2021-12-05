import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import '@services/firebase';

const container = document.querySelector('#root');

ReactDom.render(<App />, container);
