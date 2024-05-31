import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  mockFetchCountries,
  mockFetchCountryCode,
  mockFetchRoles,
  mockFetchSupervisors,
} from "../APIs/ApiHelper";

function Userform({ onSubmit, setIsOpen }) {
  const {
    isLoading: isLoadingCountries,
    error: errorCountries,
    data: countries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: mockFetchCountries,
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

  const { reset, control, handleSubmit, formState: { errors }} = useForm();

  const getDropDown = (isLoading, error, data, id, name = "") => {
    return (
      <div className="form-group">
        {name && <label htmlFor={id}>{name}</label>}
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
                  className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
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
            {errors[id] && <div className="invalid-feedback">{errors[id].message}</div>}
          </>
        )}
      </div>
    );
  };

  const inputField = (id, name = "") => {
    return (
      <div className="form-group">
        {name && <label htmlFor={id}>{name}</label>}
        <Controller
          name={id}
          control={control}
          defaultValue=""
          rules={{ required: `${name || id} is required` }}
          render={({ field }) => (
            <input
              type="text"
              id={id}
              className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
              {...field}
            />
          )}
        />
        {errors[id] && <div className="invalid-feedback">{errors[id].message}</div>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="row">
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

        <div className="row">
          <div className="col-md-12">
            {getDropDown(
              isLoadingRoles,
              errorRoles,
              roles,
              "roles",
              "Select Role"
            )}
          </div>
        </div>

        <div className="row">
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

        <div className="row">
          <div className="col-md-6">
            {inputField("firstname", "First Name")}
          </div>
          <div className="col-md-6">{inputField("lastname", "Last Name")}</div>
        </div>

        <div className="row">
          <label>Mobile Number</label>
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
              <div style={{ flexGrow: "1" }}>{inputField("mobilenumber")}</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">{inputField("email", "Email")}</div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {inputField("cardlimit", "Card Load Limit")}
          </div>

          <div className="col-md-6">
            {inputField("paymentlimit", "Payment Limit")}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="container mt-4">
        <div className="row">
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
                reset();
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
