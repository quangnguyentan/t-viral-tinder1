import axiosConfig from "../axios";
export const apiRegister = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/auth/register",
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiLoginSuccess = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/auth/login",
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
