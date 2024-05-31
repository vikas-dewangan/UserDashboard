import React from "react";
import "./UserList.css";

const UserList = ({ users }) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>User ID</th>
                  <th>Email Address</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>User Role</th>
                  <th>Expiry By</th>
                  <th>Actions</th>
                </tr>
                <tr className="search-row">
                  <th>Status</th>
                  <th></th>
                  <th>Email Address</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <React.Fragment key={user.id}>
                    <tr>
                      <td>
                        {user.status === "Active" ? (
                          <button className="btn btn-primary btn-sm button-without-pointer custom-width-button">
                            {user.status}
                          </button>
                        ) : (
                          <button className="btn btn-danger btn-sm button-without-pointer custom-width-button">
                            {user.status}
                          </button>
                        )}
                      </td>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.role}</td>
                      <td>{user.expiry}</td>
                      <td>
                        <button className="btn btn-gray btn-sm">
                          Action
                        </button>
                      </td>
                    </tr>
                    {index < users.length - 1 && (
                      <tr className="table-separator"></tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
