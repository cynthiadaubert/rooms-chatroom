import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "welcome-page" },
  { path: "/chatroom", component: "chatroom-page" },
]);
