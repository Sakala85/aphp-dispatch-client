import io from "socket.io-client";
let socket;
const ENDPOINT = "https://aphp-dispatch.herokuapp.com/";

function deleteTask(task) {
  socket = io(ENDPOINT);

  socket.emit("deleteTask", { task }, (error) => {
    if (error) {
      alert(error.message);
    }
  });
}

export default deleteTask;
