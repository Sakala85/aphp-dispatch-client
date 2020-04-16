import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "../FormElements/Input";
import { VALIDATOR_REQUIRE } from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { Button, Card } from "react-bootstrap";
import dispatchImg from "../img/dispatch.jpg";
import io from "socket.io-client";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

let socket;
const ClientVue = () => {
  const [online, setOnline] = useState(false);
  const [userId, setUserId] = useState("");
  const [task, setTask] = useState("");
  const [username, setUsername] = useState(false);
  const [tmpUsername, setTmpUsername] = useState(false);
  const ENDPOINT = "https://aphp-dispatch.herokuapp.com/";
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: tmpUsername,
        isValid: true,
      },
      problem: {
        value: null,
        isValid: true,
      },
    },
    false
  );
  // --------Connexion to socket-----------
  window.onbeforeunload = (e) => {
    socket.emit("disconnectUser", { username }, (error) => {
      if (error) {
        alert(error);
      }
    });
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    if (username !== false && username !== null && online !== true) {
      socket.emit("connectNew", { username }, (user) => {
        setUserId(user.id);
        setTask(user.task);
      });
      setOnline(true);
    }
    socket.on("sendTask", function (task) {
      if (task === null) {
        NotificationManager.warning("Tache desafectee", "Attention", 3000);
      } else {

      NotificationManager.success("Nouvelle tache attribuee", "Attention", 3000);
    }
      setTask(task);
    });
  }, [ENDPOINT, username, task, userId, online]);

  const goOnline = (event) => {
    setUsername(formState.inputs.username.value);
  };
  const reportProblem = (event) => {
    const problem = formState.inputs.problem.value;
    socket.emit("reportProblem", { task, problem, username }, (error) => {
      if (error) {
        alert(error);
      }
    });
    setTask("");
  };

  const goOffline = (event) => {
    setTmpUsername(username);
    setOnline(false);
    setUsername(false);
    socket.emit("disconnectUser", { username }, (error) => {
      if (error) {
        alert(error);
      }
    });
  };
  const finishTask = (event) => {
    socket.emit("finishTask", { task, username }, (error) => {
      if (error) {
        alert(error);
      }
    });
    setTask("");
  };

  return (
    <React.StrictMode>
      <NotificationContainer />

      {!online ? (
        <form>
          <div className="InputForm__LogIn">
            <Input
              id="username"
              element="input"
              type="text"
              label="Username"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid Username."
              onInput={inputHandler}
              initialValue={tmpUsername}
              initialValid={tmpUsername}
            />
          </div>
          <Button
            onClick={goOnline}
            variant="success"
            disabled={!formState.isValid}
          >
            goOnline
          </Button>
        </form>
      ) : (
        <div className="InputForm__LogIn">
          <Card
            style={{ width: "18rem" }}
            className="text-center card__position"
          >
            <Card.Img variant="top" src={dispatchImg} />
            <Card.Body>
              {task ? (
                <div>
                  <Card.Title>Your Task</Card.Title>
                  <Card.Text>{task}</Card.Text>
                  <Button variant="success" onClick={finishTask}>
                    Tache Terminee
                  </Button>
                  <form>
                    <div className="InputForm__LogIn">
                      <Input
                        id="problem"
                        element="input"
                        type="text"
                        label="Probleme ?"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a problem."
                        onInput={inputHandler}
                        initialValue={""}
                        initialValid={false}
                      />
                    </div>
                    <Button
                      onClick={reportProblem}
                      variant="danger"
                      disabled={!formState.isValid}
                    >
                      Report Problem
                    </Button>
                  </form>
                </div>
              ) : (
                <div>
                  <Card.Title>Waiting for a task...</Card.Title>
                  <Card.Text>
                    <LoadingSpinner />
                    {task}
                  </Card.Text>
                  <Button variant="danger" onClick={goOffline}>
                    goOffline
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </React.StrictMode>
  );
};

export default ClientVue;
