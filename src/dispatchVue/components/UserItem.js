import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Board from "./Board";

const UserItem = (props) => {
  return (
    <div className="board_user_div">
      {props.online === 1 ? (
        <Board id={props.id} className="card">
          {props.username}
        </Board>
      ) : props.online === 0 ? (
        <Board id={props.id} className="card offline">
          {props.username}
        </Board>
      ) : (
        <Board id={props.id} className="card occuped">
          {props.username}
        </Board>
      )}
    </div>
  );
};

export default UserItem;
