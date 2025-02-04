import { baseUrl, request } from "./api";

const register = ({ email, password, name, avatar }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  });
};

const logIn = ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

// getContent accepts the token as an argument.
const getUserInfo = (token) => {
  // Send a GET request to /users/me
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      authorization: `Bearer ${token}`,
    },
  });
};

const editUserInfo = ({ name, avatar }, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

export { register, logIn, getUserInfo, editUserInfo };
