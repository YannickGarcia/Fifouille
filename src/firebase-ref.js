import * as firebase from 'firebase';

// Initialize Firebase


 // DB PROD
 const config = {
 apiKey: "AIzaSyCQ-Ki-mSuqsRbqsMfXOUTDySBqYW3xWgs",
 authDomain: "fifouille-5dccb.firebaseapp.com",
 databaseURL: "https://fifouille-5dccb.firebaseio.com",
 storageBucket: "fifouille-5dccb.appspot.com",
 messagingSenderId: "671212363239"
 };
/* SUPER 3

// DB DEV
 const config = {
     apiKey: "AIzaSyBRp1ebUwX98lKMK6ns8i9EEY6M2twy1oo",
     authDomain: "offifa-dev.firebaseapp.com",
     databaseURL: "https://offifa-dev.firebaseio.com",
     storageBucket: "offifa-dev.appspot.com",
     messagingSenderId: "733443285053"
 };
 */


firebase.initializeApp(config);



export const rootRef = firebase.database().ref();
export const gamesRef = rootRef.child('games');
export const tasksRef = rootRef.child('todos');
export const usersRef = rootRef.child('users');
export const muletsRef = rootRef.child('muletvatars');
export const groupsRef = rootRef.child('groups');

export const timeRef = firebase.database.ServerValue.TIMESTAMP;