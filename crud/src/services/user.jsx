import { ENDPOINTS } from "../constant/EndPoints";
import { instanceAxios } from "../helper/instanceAxios ";

export const getUsers = () =>
  instanceAxios({ method: "GET", url: ENDPOINTS.USERS });

export const getSingleUser = (id) =>
  instanceAxios({ method: "GET", url: ENDPOINTS.USER_ID(id) });

export const addUser = (form) =>
  instanceAxios({ method: "POST", url: ENDPOINTS.USERS, data: form });

export const updateUser = (id, form) =>
  instanceAxios({ method: "PUT", url: ENDPOINTS.USER_ID(id), data: form });

export const removeUser = (id) =>
  instanceAxios({ method: "DELETE", url: ENDPOINTS.USER_ID(id) });
