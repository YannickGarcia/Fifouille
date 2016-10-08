import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

  // Initialize Firebase
var config = {
apiKey: "AIzaSyCQ-Ki-mSuqsRbqsMfXOUTDySBqYW3xWgs",
authDomain: "fifouille-5dccb.firebaseapp.com",
databaseURL: "https://fifouille-5dccb.firebaseio.com",
storageBucket: "fifouille-5dccb.appspot.com",
messagingSenderId: "671212363239"
};

firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
