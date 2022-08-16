import "./pages/welcome";
import "./pages/chatroom";
import { Router } from "@vaadin/router";
<<<<<<< HEAD
import "../server/realtimeDB";
=======
import "./realtimeDB";
>>>>>>> a837d37c7d9d16c577835f0cb7fb2ba689e8b005
import { state } from "./state";

/* e */ (function () {
  state.initListener();

  state.setEmailAndFullname({
    email: "cynthia@apx.school",
    fullname: "Cyn Perez",
  });
  state.signIn((err) => {
    if (err) {
      console.log("hubo un error en el signIn", err);
      state.askNewRoom(() => {
        state.accessExistentRoom();
      });
    }
  });

  /*   // al comenzar
  state.initListener();

  //una página (la UI) recupera el state del localStorage y si tiene el rtdbroom id y user id,
  // entonces redirige directamente a chatroom

  const currentState = state.getState();
  if (currentState.rtdbRoomId && currentState.userId) {
    const router = new Router(document.querySelector(".root"));
    router.setRoutes({ path: "/chatroom", component: "chatroom-page" });
  } */
})();
