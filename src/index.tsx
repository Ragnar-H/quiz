/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import { FirestoreProvider } from "react-firestore";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById("root");
if (root == null) {
  throw new Error("No root element found. App will not start");
}

var config = {
  apiKey: "AIzaSyAwrOGpG_EC5OewGY7DgTMZr8Pwu3wa1gc",
  authDomain: "ilab-quiz.firebaseapp.com",
  databaseURL: "https://ilab-quiz.firebaseio.com",
  projectId: "ilab-quiz",
  storageBucket: "ilab-quiz.appspot.com",
  messagingSenderId: "1029082576617"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export const FirebaseContext = React.createContext<{
  firestore: firebase.firestore.Firestore;
}>({ firestore });

ReactDOM.render(
  <FirebaseContext.Provider value={{ firestore }}>
    <FirestoreProvider firebase={firebase}>
      <App />
    </FirestoreProvider>
  </FirebaseContext.Provider>,
  root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
