import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "./usersSlice";

export const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUserList = users.map((user) => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));
  return (
    <section>
      <h2>User List</h2>
      <ul>{renderedUserList}</ul>
    </section>
  );
};
