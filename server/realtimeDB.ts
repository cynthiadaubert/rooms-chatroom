import firebase from "firebase/compat/app"; /* *sirve para conectarnos en todos los productos pero no de modo admin sino dependiendo de los permisos configurados */

import "firebase/compat/auth";
import "firebase/compat/database";

const app = firebase.initializeApp({
  apiKey: "MVIpodUmTmMef3RtGPtncNLY4cieR7pUaH8yYPFG",
  databaseURL: "https://clase-firebase-e7501-default-rtdb.firebaseio.com",
  authDomain: "clase-firebase.firebaseapp.com",
  projectId: "clase-firebase-e7501",
});

const rtdb = firebase.database();

export { rtdb };
