const socket = io();


const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username")
const room = urlSearch.get("select_room")


const usernameDiv = document.getElementById("username")
usernameDiv.innerHTML = `Olá ${username} - Bem vindo a sala ${room}`


// emit => emitir alguma informação
// on => escutar alguma informação


socket.emit(
  "selected_room", 
  {
  username,
  room,
  },
  (messages) => {
    messages.forEach(message => createMessage(message))
  }
)


document
  .getElementById("message_input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const message = event.target.value
      
      const data = {
        room,
        username,
        message
      }

      socket.emit("message", data)

      event.target.value = ""
      //console.log(message)
    }
})


socket.on("message", (data) => {
  createMessage(data)

  //console.log(data)
})

function createMessage(data) {
  const messageDiv = document.getElementById("messages");

  messageDiv.innerHTML += `
    <div class="new_message">
      <label class="form-label">
        <strong> ${data.username} </strong>
        <span>${data.text} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
      </label>
    </div>
  `
}

document.getElementById("logout").addEventListener("click", (event) => {
  window.location.href = "index.html"
})


