import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "./Card";

const TaskItem = (props) => {
  return (
    <div className="card_user_div">
      {props.state === 0 ? (
        <Card id={props.id} className="card" draggable="true">
          {props.task}
        </Card>
      ) : (
        <Card id={props.id} className="card task_finished" draggable="false">
          {props.task}
        </Card>
      )}
    </div>
  );
};

export default TaskItem;
