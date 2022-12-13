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

const getPostService = async () => {
  try {
    const res = axios.get(`/api/get-post`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updatePostService = async (data) => {
  try {
    const res = axios.put(`/api/update-post-by-id`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const createPostService = async (data) => {
  try {
    const res = axios.post(`/api/create-post`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deletePostService = async (id) => {
  try {
    const res = axios.delete(`/api/delete-post?id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//bicycle

const getBicycleByPlaceService = async (placeId, page, size) => {
  try {
    const res = axios.get(
      `/api/get-bicycle-by-place?placeId=${placeId}&page=${page}&size=${size}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getBicycleByPlaceAdminService = async (placeId, page, size) => {
  try {
    const res = axios.get(
      `/api/get-bicycle-by-place-admin?placeId=${placeId}&page=${page}&size=${size}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getAllTypeBicycleService = async () => {
  try {
    const res = axios.get(`/api/get-all-type-bicycle`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const createBicycleService = async (data) => {
  try {
    const res = axios.post(`/api/create-bicycle`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateBicycleService = async (data) => {
  try {
    const res = axios.put(`/api/update-bicycle`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteBicycleService = async (id) => {
  try {
    const res = axios.delete(`/api/delete-bicycle?id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//order
const createOrderService = async (data) => {
  try {
    const res = axios.post(`/api/create-order`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateOrderService = async (data) => {
  try {
    const res = axios.post(`/api/update-order`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getOrderPriceService = async (userEmail) => {
  try {
    const res = axios.get(`/api/get-order-price?userEmail=${userEmail}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getOrderService = async (userEmail) => {
  try {
    const res = axios.get(`/api/get-order?userEmail=${userEmail}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getBicycleByNameService = async (name) => {
  try {
    const res = axios.get(`/api/get-bicycle-by-name?name=${name}`);
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
  getBicycleByPlaceService,
  getPostService,
  updatePostService,
  createPostService,
  deletePostService,
  getAllTypeBicycleService,
  createBicycleService,
  updateBicycleService,
  deleteBicycleService,
  createOrderService,
  getBicycleByPlaceAdminService,
  getOrderPriceService,
  getOrderService,
  updateOrderService,
  getBicycleByNameService,
};
