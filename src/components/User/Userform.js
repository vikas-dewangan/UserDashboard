import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  fetchCountries,
  mockFetchCountryCode,
  mockFetchRoles,
  mockFetchSupervisors,
} from "../APIs/ApiHelper";
import { addItem } from "../APIs/StorageAPI";

function Userform({ setIsOpen }) {
  const queryClient = useQueryClient();
  const {
    isLoading: isLoadingCountries,
    error: errorCountries,
    data: countries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const {
    isLoading: isLoadingRoles,
    error: errorRoles,
    data: roles,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: mockFetchRoles,
  });

  const {
    isLoading: isLoadingSupervisors,
    error: errorSupervisors,
    data: supervisors,
  } = useQuery({
    queryKey: ["supervisors"],
    queryFn: mockFetchSupervisors,
  });

  const {
    isLoading: isLoadingCountryCode,
    error: errorCountryCode,
    data: countryCodes,
  } = useQuery({
    queryKey: ["countryCodes"],
    queryFn: mockFetchCountryCode,
  });

  const {
    mutate,
    isError: isPostError,
    isPending,
    error: postError,
    reset: postReset,
  } = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["userData"]);
    },
  });

  const {
    reset: formReset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutate({ ...data, status: "Active" });
    formReset();
    setIsOpen(false);
  };

  const getDropDown = (isLoading, error, data, id, name = "") => {
    return (
      <div className="form-group">
        {name && <label htmlFor={id}>{name}<span style={{color:"red"}}> *</span></label>}
        {isLoading ? (
          <select id={id} className="form-control" disabled>
            <option>Loading...</option>
          </select>
        ) : error ? (
          <div className="text-danger">Error: {error.message}</div>
        ) : (
          <>
            <Controller
              name={id}
              control={control}
              rules={{ required: `Required Field` }}
              defaultValue=""
              render={({ field }) => (
                <select
                  id={id}
                  className={`form-control ${errors[id] ? "is-invalid" : ""}`}
                  {...field}
                >
                  <option value="">Select</option>
                  {data?.map((element) => (
                    <option key={element.id} value={element.value}>
                      {element.value}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors[id] && (
              <div className="invalid-feedback">{errors[id].message}</div>
            )}
          </>
        )}
      </div>
    );
  };

  const inputField = (id, name = "", validation = {}) => {
    return (
      <div className="form-group">
        {name && <label htmlFor={id}>{name}<span style={{color:"red"}}> *</span></label>}
        <Controller
          name={id}
          control={control}
          defaultValue=""
          rules={{ required: `${name || id} is required`, ...validation }}
          render={({ field }) => (
            <input
              type="text"
              id={id}
              className={`form-control ${errors[id] ? "is-invalid" : ""}`}
              {...field}
            />
          )}
        />
        {errors[id] && (
          <div className="invalid-feedback">{errors[id].message}</div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        {/* Country */}
        <div className="row mt-3">
          <div className="col-md-12">
            {getDropDown(
              isLoadingCountries,
              errorCountries,
              countries,
              "country",
              "Select Country"
            )}
          </div>
        </div>

        {/* Role */}
        <div className="row mt-3">
          <div className="col-md-12">
            {getDropDown(
              isLoadingRoles,
              errorRoles,
              roles,
              "role",
              "Select Role"
            )}
          </div>
        </div>

        {/* Super Visor */}
        <div className="row mt-3">
          <div className="col-md-12">
            {getDropDown(
              isLoadingSupervisors,
              errorSupervisors,
              supervisors,
              "supervisors",
              "Select Supervisor"
            )}
          </div>
        </div>

        {/* Name */}
        <div className="row mt-3">
          <div className="col-md-6">
            {inputField("firstname", "First Name", {
              pattern: { value: /^[A-Za-z]{3,}$/, message: "Invalid first name" },
            })}
          </div>
          <div className="col-md-6">
            {inputField("lastname", "Last Name", {
              pattern: { value: /^[A-Za-z]{3,}$/, message: "Invalid last name" },
            })}
          </div>
        </div>

        {/* Mobile Number */}
        <div className="row mt-3">
          <label>Mobile Number <span style={{color:"red"}}> *</span></label>
          <div className="col-md-12">
            <div className="d-flex">
              <div style={{ flexGrow: "1" }}>
                {getDropDown(
                  isLoadingCountryCode,
                  errorCountryCode,
                  countryCodes,
                  "countryCode"
                )}
              </div>

              {/* since we have different country code, having only a normal regex check for mobile */}
              <div style={{ flexGrow: "1" }}>
                {inputField("mobilenumber", undefined, {
                  pattern: {
                    value: /^[0-9]{5,15}$/,
                    message: "Invalid mobile number",
                  },
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="row mt-3">
          <div className="col-md-12">
            {inputField("email", "Email", {
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email address",
              },
            })}
          </div>
        </div>

        {/* Card Limit */}
        <div className="row mt-3">
          <div className="col-md-6">
            {inputField("cardlimit", "Card Load Limit",{ pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid Card Load Limit",
                  },})}
          </div>

          {/* Payment Limit */}
          <div className="col-md-6">
            {inputField("paymentlimit", "Payment Limit",{ pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid Payment Limit",
                  },})}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="container mt-4">
        <div className="row mt-3">
          <div className="col-md-12 d-flex">
            <button type="submit" className="btn btn-primary">
              + Add User
            </button>
            <button
              type="button"
              className="btn btn-gray"
              style={{ marginLeft: "1rem", border: "2px solid gray" }}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                formReset();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Userform;
