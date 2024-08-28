import axios from "axios";

export const fetchCountries = async () => {
  try {
    const response = await axios.get(
      "https://api.first.org/data/v1/countries"
    );

    const countryData = response?.data?.data;
    if (countryData && Object.keys(countryData).length > 0) {
      return Promise.resolve(
        Object.entries(countryData).map(([code, { country }], index) => ({
          value: country,
          code,
          id: index
        }))
      );
    } else {
      return Promise.resolve([]);
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
    return Promise.reject(error);
  }
};

// country test data
export function mockFetchCountries() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const countries = [
        { value: "Albania", id: "1", code: "ALB" },
        { value: "India", id: "2", code: "IN" },
        { value: "United State", id: "3", code: "US" },
      ];
      resolve(countries);
    }, 1000);
  });
}

export function mockFetchRoles() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const roles = [
        { value: "role1", id: "1", code: "ROLE1" },
        { value: "role2", id: "2", code: "ROLE2" },
        { value: "role3", id: "3", code: "ROLE3" },
      ];
      resolve(roles);
    }, 1000);
  });
}

export function mockFetchSupervisors() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const supervisors = [
        { value: "sup1", id: "1", code: "SUP1" },
        { value: "sup2", id: "2", code: "SUP2" },
        { value: "sup3", id: "3", code: "SUP3" },
      ];
      resolve(supervisors);
    }, 1000);
  });
}

export function mockFetchCountryCode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const supervisors = [
        { value: "966", id: "1", code: "CC1" },
        { value: "971", id: "2", code: "CC2" },
        { value: "91", id: "3", code: "CC3" },
      ];
      resolve(supervisors);
    }, 1000);
  });
}
