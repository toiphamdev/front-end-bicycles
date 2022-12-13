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

const logout = async (data) => {
  try {
    const res = axios.post("/api/logout", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getNotifyService = async (userEmail) => {
  try {
    const res = axios.get(`/api/get-notify?userEmail=${userEmail}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateNotifyService = async (data) => {
  try {
    const res = axios.put(`/api/update-notify`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export {
  createNewUserService,
  login,
  logout,
  getNotifyService,
  updateNotifyService,
};
