import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dispatchVue.css";
import Input from "../FormElements/Input";
import { VALIDATOR_REQUIRE } from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { Button } from "react-bootstrap";
// import dispatchImg from "../img/dispatch.jpg";
import io from "socket.io-client";
import TaskList from "./components/TaskList";
import UserList from "./components/UserList";

let socket;
const DispatchVue = () => {
  const [task, setTask] = useState("");
  const [user, setUser] = useState("");
  const ENDPOINT = "https://aphp-dispatch.herokuapp.com/";
  const [formState, inputHandler] = useForm(
    {
      task: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  // --------Connexion to socket-----------
  useEffect(() => {
    socket = io(ENDPOINT);
    const username = "dispatch";
    socket.emit("connectNew", { username }, (error) => {
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("getTask", function (task, user) {
      // setUser(user);
      setTask(task);
    });
  }, []);

  useEffect(() => {
    socket.on("getUser", function (user) {
      setUser(user);
    });
  }, []);

  // --------Task System-------------
  const consultUsers = (event) => {
    socket.emit("consultUsers", {}, (error) => {
      if (error) {
        alert(error);
      }
    });
  };

  const addTask = (event) => {
    const task = formState.inputs.task.value;
    if (task !== "") {
      socket.emit("addTask", { task }, (error) => {
        if (error) {
          alert(error.message);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Button onClick={consultUsers} variant="success">
        CONSULT
      </Button>
      <form>
        <div className="InputForm__LogIn">
          <Input
            id="task"
            element="input"
            type="text"
            label="Task"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Task."
            onInput={inputHandler}
            initialValue={""}
            initialValid={false}
          />
        </div>
        <Button
          className="Dispatch__Form__Button"
          onClick={addTask}
          variant="success"
          disabled={!formState.isValid}
        >
          Add Task
        </Button>
      </form>
      <main className="flexbox">
        <TaskList tasks={task} />
        <UserList users={user} />
      </main>
    </React.Fragment>
  );
};

export default DispatchVue;
