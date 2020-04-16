import React from "react";
import { Card } from "react-bootstrap"
import UserItem from "./UserItem";
import "bootstrap/dist/css/bootstrap.css";

const UserList = (props) => {
  
  if (props.users.length === 0) {
    return (
      <div className="center">
        <Card id="userList" className="board">
          <h2>No user found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <Card id="userList" style={{ width: '18rem' }} className="board">
        <h1>Utilisateurs</h1>
        <br />
        {props.users.user.map((user) => {
          return <UserItem username={user.username} key={user.id} id={user.id} online={user.online} />;
        })}
    </Card>
  );
};

export default UserList;
