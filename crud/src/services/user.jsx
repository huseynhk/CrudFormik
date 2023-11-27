import { ENDPOINTS } from "../constant/EndPoints";
import { instanceAxios } from "../helper/instanceAxios ";

export const getUsers = () =>
  instanceAxios({ method: "GET", url: ENDPOINTS.USERS });

export const getSingleUser = (userId) =>
  instanceAxios({ method: "GET", url: ENDPOINTS.USER_ID(userId) });

export const addUser = (form) =>
  instanceAxios({ method: "POST", url: ENDPOINTS.USERS, data: form });

export const updateUser = (userId, form) =>
  instanceAxios({ method: "PUT", url: ENDPOINTS.USER_ID(userId), data: form });

export const removeUser = (userId) =>
  instanceAxios({ method: "DELETE", url: ENDPOINTS.USER_ID(userId) });
