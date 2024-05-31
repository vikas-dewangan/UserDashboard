// src/App.js
import React, { useState } from "react";
import UserList from "./components/User/UserList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
        </div>
      </div>

      <UserList/>
    </div>
  );
};

export default App;
