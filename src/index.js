import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDM0ziu1IKBMgjGv_bFO_-QwYdGKCU90Tk',
  authDomain: 'colordatafeed.firebaseapp.com',
  databaseURL: 'https://colordatafeed.firebaseio.com',
  projectId: 'colordatafeed',
  storageBucket: 'colordatafeed.appspot.com',
  messagingSenderId: '423920005187',
  appId: '1:423920005187:web:a15c5a3773698f7c2f64f6',
  measurementId: 'G-D9R66XRTE6',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
