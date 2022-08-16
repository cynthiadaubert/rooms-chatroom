import firebase from "firebase/compat/app"; /* *sirve para conectarnos en todos los productos pero no de modo admin sino dependiendo de los permisos configurados */

import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

import * as admin from "firebase-admin";

import * as serviceAccount from "../../firestore realtime/firebaseKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://clase-firebase-e7501-default-rtdb.firebaseio.com/",
  projectId: "clase-firebase-e7501",
});

const firestore = admin.firestore();

const app = firebase.initializeApp({
  apiKey: "MVIpodUmTmMef3RtGPtncNLY4cieR7pUaH8yYPFG",
  databaseURL: "https://clase-firebase-e7501-default-rtdb.firebaseio.com",
  authDomain: "clase-firebase.firebaseapp.com",
});

const rtdb = firebase.database();

export { rtdb, firestore };
