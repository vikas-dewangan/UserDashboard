// src/App.js
import React, { useState } from "react";
import UserList from "./components/User/UserList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { useForm } from "react-hook-form";

const sampleUsers = [
  {
    status: "Active",
    id: 1,
    email: "user1@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "Admin",
    expiry: "2024-12-31",
  },
  {
    status: "Inactive",
    id: 2,
    email: "user2@example.com",
    firstName: "Jane",
    lastName: "Smith",
    role: "User",
    expiry: "2023-11-30",
  },
];

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setIsOpen(false);
  };
  return (
    <div className="App">
      <div
        className="d-flex"
        style={{ justifyContent: "space-between", margin: "1rem" }}
      >
        <div className="mt-4" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
          Users List
        </div>
        <div>
          <button
            className="btn btn-primary mt-4"
            onClick={() => setIsOpen(true)}
          >
            Add User
          </button>
            <Sidebar
              onSubmit={onSubmit}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
        </div>
      </div>

      <UserList users={sampleUsers} />
    </div>
  );
};

export default App;
