import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCQ-Ki-mSuqsRbqsMfXOUTDySBqYW3xWgs",
    authDomain: "fifouille-5dccb.firebaseapp.com",
    databaseURL: "https://fifouille-5dccb.firebaseio.com",
    storageBucket: "fifouille-5dccb.appspot.com",
    messagingSenderId: "671212363239"
};


firebase.initializeApp(config);



export const rootRef = firebase.database().ref();
export const gamesRef = rootRef.child('games');
export const tasksRef = rootRef.child('todos');
export const usersRef = rootRef.child('users');
export const muletsRef = rootRef.child('muletvatars');
export const groupsRef = rootRef.child('groups');