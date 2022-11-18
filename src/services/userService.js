import { default as axios } from "../utils/axios";

const createNewUserService = async (data) => {
  try {
    const res = axios.post("/api/create-new-user", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const login = async (data) => {
  try {
    const res = axios.post("/api/login", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {};

export { createNewUserService, login, logout };
