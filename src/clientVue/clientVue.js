import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "../FormElements/Input";
import { VALIDATOR_REQUIRE } from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { Button, Card, Modal } from "react-bootstrap";
import dispatchImg from "../img/dispatch.jpg";
import io from "socket.io-client";

let socket;
const ClientVue = () => {
  const [online, setOnline] = useState(false);
  const [userId, setUserId] = useState("");
  const [task, setTask] = useState("");
  const [username, setUsername] = useState(false);
  const [tmpUsername, setTmpUsername] = useState(false);
  const ENDPOINT = "https://react-dispatch-aphp.herokuapp.com/";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: tmpUsername,
        isValid: true,
      },
    },
    false
  );
  // --------Connexion to socket-----------
  useEffect(() => {
    socket = io(ENDPOINT);
    if (username !== false && username !== null && online !== true) {
      socket.emit("connectNew", { username }, (user) => {
        setUserId(user.id);
      });
      setOnline(true);
    }
    socket.on("sendTask", function (task) {
      console.log(task);
      setTask(task);
    });
  }, [ENDPOINT, username, task, userId, online]);
  // --------Task System-------------

  const goOnline = (event) => {
    setUsername(formState.inputs.username.value);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>PROBLEME</Modal.Title>
        </Modal.Header>
        <Modal.Body>INPUT PROBLEM</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Envoyer
          </Button>
        </Modal.Footer>
      </Modal>
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
                  <Button variant="danger" onClick={handleShow}>
                    Probleme
                  </Button>
                </div>
              ) : (
                <div>
                  <Card.Title>Waiting for a task...</Card.Title>
                  <Card.Text>{task}</Card.Text>
                  <Button variant="danger" onClick={goOffline}>
                    goOffline
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
      <Button></Button>
    </React.StrictMode>
  );
};

export default ClientVue;
