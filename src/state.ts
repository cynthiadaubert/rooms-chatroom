const API_BASE_URL = "http://localhost:3009";

import { rtdb } from "../server/realtimeDB";

import map from "lodash/map";

const state = {
  data: {
    email: "",
    fullname: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    messages: [],
  },

  listeners: [],

  initListener() {
    const storagedState = localStorage.getItem("saved-state");
    console.log("soy el estado guardado", storagedState);
    if (storagedState == null) {
      this.setState(this.data);
    } else {
      this.setState(JSON.parse(storagedState));
    }
  },

  listenRoom() {
    const currentState = this.getState();
    const chatroomsRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);
    console.log("console de listenroom", chatroomsRef);
    chatroomsRef.on("value", (snap) => {
      const serverMessages = snap.val();
      console.log(serverMessages);

      const messagesList = map(serverMessages.messages);
      (currentState.messages = messagesList), this.setState(currentState);
    });
  },

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
    console.log("soy el state, he cambiado", this.data);
  },

  setEmailAndFullname(params: { email: String; fullname: String }) {
    const currentState = this.getState();
    currentState.email = params.email;
    currentState.fullname = params.fullname;
    this.setState(currentState);
  },

  /*   pushMessage(message: String) {
    const nombreEnState = this.data.fullname;
    fetch(API_BASE_URL + "/messages", {
      method: "post",
      body: JSON.stringify({
        fullname: nombreEnState,
        message: message,
      }),
    });
  }, */

  signIn(callback?) {
    const currentState = this.getState();
    if (currentState.email) {
      fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: currentState.email }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("soy la data del fetch SignIn", data);
          currentState.userId = data.id;
          this.setState(currentState);
          callback();
        });
    } else {
      console.error("No hay email en el state");
      callback(true);
    }
  },

  askNewRoom(callback?) {
    const currentState = this.getState();
    if (currentState.userId) {
      fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: currentState.userId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("soy la data del fetch asknewRoom", data);
          currentState.roomId = data.id;
          this.setState(currentState);
          if (callback) {
            callback();
          }
        });
    } else {
      console.error("No hay user id en el state");
    }
  },

  accessExistentRoom(callback?) {
    const currentState = this.getState();
    const roomId = currentState.roomId;
    if (currentState.userId) {
      fetch(
        API_BASE_URL + "/rooms/" + roomId + "?userId=" + currentState.userId
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("soy la data del fetch accessExistentRoom", data);
          currentState.rtdbRoomId = data.rtdbRoomId;
          this.setState(currentState);
          this.listenRoom();
          if (callback) {
            callback();
          }
        });
    } else {
      console.error("No hay user id en el state");
    }
  },

  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
