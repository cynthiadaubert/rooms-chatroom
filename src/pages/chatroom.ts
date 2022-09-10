import { state } from "../state";

type Message = {
  from: String;
  message: String;
};

class ChatroomPage extends HTMLElement {
  connectedCallback() {
    this.render();
    const form = this.querySelector(".submit-message");
    form!.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      console.log(target["new-message"].value);
    });
  }

  messages: Message[] = [];

  render() {
    let shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="header"></div>
        <div class="container">
            <div class="titles">
              <h1>Chat</h1>
              <h2>Room id: ${state.data.roomId}</h2>
            </div>
            <div class="chat">
                ${this.messages.map((messag) => {
                  return `<div class="mensaje">${messag.from}:${messag.message}</div>`;
                })}
            </div>
            <form class="submit-message">
                <input type="text" name="new-message">
                <button>Enviar</button>
            </form>
        </div>
        
        `;

    const style = document.createElement("style");

    style.innerHTML = `

    .container {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      align-items: center;
    }

    .titles {
      width: 321px;
    }

      .header {
        height: 60px;
        background-color: #FF8282;
      }

      h1{
        font-size: 52px;
        text-align: left;
        margin: 15px 0px 0px 0px;
        padding: 0;
      }

      h2 {
        margin: 0;
        padding: 0;
      }

      .chat {
        height: 530px;
        width: 321px;
        border: 2px solid black;
        margin-bottom: 12px;
      }

      form {
        display: flex;
        flex-direction: column;
      }

      input, select{
        margin-bottom: 15px;
        height: 55px;
        width: 312px;
        border: solid 2px black;
        border-radius: 4px;
      }

      button {
        margin-top: 12px;
        height: 55px;
        width: 321px;
        font-size: 22px;
        background-color: #9CBBE9;
        border-radius: 4px;
        border: none;
        font-weight: bold;
      }
          
    `;

    shadow.appendChild(div);
    shadow.appendChild(style);
  }
}

customElements.define("chatroom-page", ChatroomPage);
