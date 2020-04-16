import React from "react";
import Board from "./Board";
import TaskItem from "./TaskItem";
import "bootstrap/dist/css/bootstrap.css";

const TaskList = (props) => {
  if (props.tasks.length === 0) {
    return (
      <div className="center">
        <Board id="taskList" className="board">
          <h2>No task found.</h2>
        </Board>
      </div>
    );
  }
  return (
    <Board id="taskList" className="board">
      <div>
        <h1>Taches</h1>
        {props.tasks.task.map((task) => {
            return (
              <TaskItem
                task={task.task}
                key={task.id}
                id={task.id}
                state={task.assigned}
              />
            );
        })}
      </div>
    </Board>
  );
};

export default TaskList;
