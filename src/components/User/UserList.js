import React, { useEffect, useState } from "react";
import "./UserList.css";
import { deleteItem, fetchItems } from "../APIs/StorageAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const UserList = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingUserData,
    error: errorUserData,
    data: userdata,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchItems,
  });

  const {
    mutate,
    isError: isPostError,
    isPending,
    error: postError,
    reset: postReset,
  } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["userData"]);
    },
  });

  const deleteUserData = (id) => {
    mutate(id);
  };

  const [filters, setFilters] = useState({
    status: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = userdata?.filter((user) => {
    return (
      (filters.status === "" || user.status === filters.status) &&
      (filters.email === "" || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.firstName === "" || user.firstname.toLowerCase().includes(filters.firstName.toLowerCase())) &&
      (filters.lastName === "" || user.lastname.toLowerCase().includes(filters.lastName.toLowerCase()))
    );
  });

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
                <th>
                    <select
                      className="form-control"
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                    >
                      <option value="">All</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </th>
                  <th>
                  </th>
                  <th>
                  <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={filters.email}
                      placeholder="Email Address"
                      onChange={handleFilterChange}
                    />
                  </th>
                  <th>
                  <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={filters.firstName}
                      placeholder="First Name"
                      onChange={handleFilterChange}
                    />
                  </th>
                  <th>
                  <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={filters.lastName}
                      placeholder="Last Name"
                      onChange={handleFilterChange}
                    />
                  </th>
                  <th>
                  </th>
                  <th>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((user, index) => (
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
                      <td>{user.id ?? "-"}</td>
                      <td>{user.email ?? "-"}</td>
                      <td>{user.firstname ?? "-"}</td>
                      <td>{user.lastname ?? "-"}</td>
                      <td style={{ fontWeight: "600" }}>{user.role ?? "-"}</td>
                      <td>{user.expiry ?? "-"}</td>
                      <td>
                        <button
                          className="btn btn-gray btn-sm"
                          onClick={() => {
                            deleteUserData(user.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {index < filteredData.length - 1 && (
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
