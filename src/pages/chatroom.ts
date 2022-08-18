import { Router } from "@vaadin/router";
class ChatroomPage extends HTMLElement {
  connectedCallback() {
    this.render();
    const form = document.querySelector(".form");
    form!.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      /*       console.log(target.nombre.value);
        state.setNombre(target.nombre.value); */
      Router.go("/chatroom");
    });
  }
  render() {
    this.innerHTML = `
          <h1>Bienvenido</h1>
          <form class="form">
              <div><label>email</label></div>
              <input type="email" name="email">
              <div><label>tu nombre</label></div>
              <input type="text" name="nombre">
              <div><label>room</label></div>
              <select>
                  <option>nuevo room</option>
                  <option>room existente</option>
              </select>
              <button>Comenzar</button>
          </form>
          `;
  }
}

customElements.define("chatroom-page", ChatroomPage);
