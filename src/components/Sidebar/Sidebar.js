import React from "react";
import "./Sidebar.css";
import Userform from "../User/Userform";

const Sidebar = (props) => {
  const { setIsOpen, isOpen } = props;

  return (
    <div className={`side-drawer ${isOpen ? "open" : ""}`} style={{overflow:"auto"}}>
      <div className="drawer-content">
        <h3>Add New User</h3>
        <Userform setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
