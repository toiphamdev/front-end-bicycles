import { default as axios } from "../utils/axios";
//allcode
const getAllCodeService = async (type) => {
  try {
    const res = axios.get(`/api/get-allcode?type=${type}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//place
const getPlaceService = async () => {
  try {
    const res = axios.get("/api/get-all-place");
    return res;
  } catch (error) {
    console.log(error);
  }
};
const getDetailPlaceService = async (id) => {
  try {
    const res = axios.get(`/api/get-detail-place?id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getPlaceByProviceService = async (page, size, provinceId) => {
  try {
    const res = axios.get(
      `/api/get-place-by-province?page=${page}&size=${size}&provinceId=${provinceId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getPlaceSelectService = async (provinceId) => {
  try {
    const res = axios.get(`/api/get-place-selected?provinceId=${provinceId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updatePlaceService = async (data) => {
  try {
    const res = axios.put(`/api/update-place-by-id`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const createPlaceService = async (data) => {
  try {
    const res = axios.post(`/api/create-place`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deletePlaceService = async (id) => {
  try {
    const res = axios.delete(`/api/delete-place?id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//post

const getHomePostService = async () => {
  try {
    const res = axios.get("/api/get-home-post");
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getDetailPostService = async (id) => {
  try {
    const res = axios.get(`/api/get-detail-post?id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getAllPostService = async (page, size) => {
  try {
    const res = axios.get(`/api/get-all-post?page=${page}&size=${size}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllCodeService,
  getPlaceService,
  getDetailPlaceService,
  getPlaceByProviceService,
  getHomePostService,
  getDetailPostService,
  getAllPostService,
  getPlaceSelectService,
  updatePlaceService,
  createPlaceService,
  deletePlaceService,
};
