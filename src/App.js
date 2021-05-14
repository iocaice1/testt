import { Fragment, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => setUsers(json));

  return (
    <div className="app">
      {users.map((user) => {
        return (
          <Fragment>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Website</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
                <td>{user.phone}</td>
              </tr>
            </tbody>
          </Fragment>
        );
      })}
    </div>
  );
}

export default App;
