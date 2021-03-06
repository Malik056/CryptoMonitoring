import { server } from "../store/index";
import axios from "axios";
const mocks = {
  auth: { POST: { token: "This-is-a-mocked-token" } },
  "user/me": { GET: { name: localStorage.getItem("user")?.name ?? "" } }
};

export const getRequest = obj => {
  console.log("obj: ", obj);
  const serverAdd = server;
  console.log("server: ", serverAdd);
  const url =
    serverAdd +
    (obj.withPort ?? true ? `${obj.port ?? ":8081"}/` : obj.pathAndQuery);
  const obj2 = axios
    .get(
      url,
      {
        mode: "no-cors"
      }
      // , {
      // // mode: 'no-cors', // 'cors' by default
      // headers: {
      //   "Content-Type": "text/plain"
      // }
      // }
    )
    .catch(err => {
      console.log(err);
      return {
        data: `user1:cGFzczE=
    user2:cGFzczI=`
      };
    });
  return obj2;
};

export const apiCall = ({ url, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mocks[url][method || "GET"]);
        console.log(`Mocked '${url}' - ${method || "GET"}`);
        console.log("response: ", mocks[url][method || "GET"]);
      } catch (err) {
        reject(new Error(err));
      }
    }, 1000);
  });
