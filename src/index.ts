import "./pages/welcome";
import "./pages/chatroom";
import "./router";
import { state } from "./state";

/* e */ (function () {
  state.initListener();

  state.suscribe(() => {
    /*  console.log("soy el state del init", state.getState().userId); */
  });

/*   state.setEmailAndFullname({
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

  state.signIn();
  state.askNewRoom();
  state.listenRoom();
  state.accessExistentRoom(); */
})();

/*   // al comenzar
  state.initListener();

  //una página (la UI) recupera el state del localStorage y si tiene el rtdbroom id y user id,
  // entonces redirige directamente a chatroom

  const currentState = state.getState();
  if (currentState.rtdbRoomId && currentState.userId) {
    const router = new Router(document.querySelector(".root"));
    router.setRoutes({ path: "/chatroom", component: "chatroom-page" });
  } */

// Propuesta:
// al comenzar (para evitar la primera pantalla)
// state.init()
// recupera el state del localStorage
// const cs = state.getState()
// if(cs.rtdbRoomId && cs.userId){
//   Router.push("/chat")
// }
