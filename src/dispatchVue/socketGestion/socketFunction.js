import io from "socket.io-client";
let socket;
const ENDPOINT = "https://react-dispatch-aphp.herokuapp.com/";

function AssignTask(user, task_id) {
  socket = io(ENDPOINT);
  socket.emit("assignTask", { user, task_id }, (error) => {
    if (error) {
      alert(error);
    }
  });
}

export default AssignTask;
