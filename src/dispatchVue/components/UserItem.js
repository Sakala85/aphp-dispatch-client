import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Board from "./Board";

const UserItem = (props) => {
  return (
    <div className="board_user_div">
      {props.online === 1 ? (
        <Board id={props.id} className="board_user">
          <h1>{props.username}</h1>
        </Board>
      ) : props.online === 0 ? (
        <Board id={props.id} className="board_user offline">
          <h1>{props.username}</h1>
        </Board>
      ) : (
        <Board id={props.id} className="board_user occuped">
          <h1>{props.username}</h1>
        </Board>
      )}
    </div>
  );
};

export default UserItem;
