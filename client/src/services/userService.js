import axiosConfig from "../axios";
export const apiGetAllUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/users",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetUserById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/users/" + id,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/users/get-current",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdatedUser = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "/users/update/" + id,
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdatedWithDrawAndDeposit = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "/users/updateMoney/" + id,
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
