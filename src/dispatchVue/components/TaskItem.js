import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "./Card";
import unassignTask from "../socketGestion/socketDeleteTask";
import deleteTask from "../socketGestion/socketDeleteDefinitely";

const TaskItem = (props) => {
  const unassignThisTask = (e) => {
    unassignTask(props.task);
  }
  const deleteThisTask = (e) => {
    deleteTask(props.task);
  }
  return (
    <div className="card_user_div">
      {props.state === 0 ? (
        <Card id={props.id} className="card" draggable="true" onClick={deleteThisTask}>
          {props.task}
        </Card>
      ) : props.state === 1 ? (
        <Card id={props.id} className="card task_assigned" draggable="false" onClick={unassignThisTask}>
          {props.task} >>> {props.username}
        </Card>
      ) : (
        <Card id={props.id} className="card task_problem" draggable="true" onClick={deleteThisTask}>
          ***{props.task}*** <br /> {props.problem}
        </Card>
      )}
    </div>
  );
};

export default TaskItem;
