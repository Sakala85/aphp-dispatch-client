import io from "socket.io-client";
let socket;
const ENDPOINT = "https://aphp-dispatch.herokuapp.com/";

function unassignTask(task) {
  socket = io(ENDPOINT);

  socket.emit("unassignTask", { task }, (error) => {
  console.log("TASK DELETED");

    if (error) {
      alert(error.message);
    }
  });
}

export default unassignTask;
