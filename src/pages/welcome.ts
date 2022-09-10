import { Router } from "@vaadin/router";
import { state } from "../state";

class WelcomePage extends HTMLElement {
  connectedCallback() {
    this.render();
    /*     const form: any = document.querySelector("form");
    console.log(form); */

    /*     form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      console.log("soy target", target);
       state.setEmailAndFullname(target.value); 
      Router.go("/chatroom");
    }); */
  }
  render() {
    let shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="header"></div>
      <h1>Bienvenido</h1>
      <form class="form">
        <div><label>email</label></div>
          <input type="email" name="email" >
            <div><label>tu nombre</label></div>
            <input type="text" name="fullname">
          <div><label>room</label></div>
          <select name="room">
              <option value="new">nuevo room</option>
              <option value="old">room existente</option>
          </select>
          <div class="id"><label>room id</label></div>
          <input class="id" type="text" name="roomid">
          <button>Comenzar</button>
      </form>
    
    `;

    const style = document.createElement("style");

    style.innerHTML = `

      {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .header {
        height: 60px;
        background-color: #FF8282;
      }

      h1{
        font-size: 52px;
        text-align: center;
        margin: 15px 0px 25px 0px;
        padding: 0;
      }

      form {
        margin: 0 auto;
        height: 450px;
        width: 312px;
        display: flex;
        flex-direction: column;
      }

      label, option{
        font-size: 24px;
        text-align: left;
        font-weight: bold;
      }

      input, select{
        margin-bottom: 15px;
        height: 55px;
        width: 312px;
        border: solid 2px black;
        border-radius: 4px;
      }

      button {
        margin-top: 23px;
        height: 55px;
        width: 321px;
        font-size: 22px;
        background-color: #9CBBE9;
        border-radius: 4px;
        border: none;
        font-weight: bold;
      }

      .id {
        display: none;
      }

      .show {
        display: visible;
      }
          
    `;

    const formElem = div.querySelector("form");
    const room = div.querySelector("select");
    console.log(room);

    formElem?.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const room = target.room.value;
      const email = target.email.value;
      const fullname = target.fullname.value;
      console.log("soy email", email, "soy nombre", fullname, room);

      /*       if (room == "old") {
        idField?.classList.remove("id");
      } else {
        console.log("es un room viejo");
      } */
      state.setEmailAndFullname({ email: email, fullname: fullname });
      Router.go("/chatroom");
    });

    function changeSelect() {
      const select = div.querySelector("select");
      const roomId = div.querySelector(".id");

      select?.addEventListener("change", (e) => {
        const target = e.target as any;
        if (target.value === "old") {
          roomId?.classList.remove("hidden");
        }
      });
    }

    changeSelect();
    shadow.appendChild(div);
    shadow.appendChild(style);
  }
}

customElements.define("welcome-page", WelcomePage);
