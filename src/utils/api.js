import { server, blockChainAddress, apiEndpoint } from "../store/index";
import axios from "axios";
import Web3 from "web3";
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
  const obj2 = axios.get(
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
  );
  // .catch(err => {
  //   console.log(err);
  //   return {
  //     data: `user1:cGFzczE=
  // user2:cGFzczI=`
  //   };
  // });
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

export const getSmartContract = ({ address, abi }) => {
  const web3 = new Web3(blockChainAddress);
  const contract = new web3.eth.Contract(abi, address);
  return contract;
};

export const sendTrx = async ({ path, method, body, headers }) => {
  try {
    if (path.startsWith("/")) {
      path.replace("/", "");
    }
    // debugger;
    const endPoint = apiEndpoint;
    let result;
    const formData = new FormData();
    formData.append("_method", "PATCH");
    if (method.toLowerCase() == "PATCH".toLowerCase()) {
      result = await axios.patch(endPoint + "/" + path, formData, {
        headers: headers
      });
    } else if (method.toLowerCase() == "POST".toLowerCase()) {
      result = await axios.post(endPoint + "/" + path, body, {
        headers: headers
      });
    } else {
      return null;
    }
    // result = await axios({
    //   url: endPoint + '/' + path,
    //   method: method,
    //   data: body,
    //   headers: headers ?? { "Content-Type": "application/json" },
    // });
    // const result = await fetch(endPoint + '/' + path, {
    //   method,
    //   body,
    //   headers: headers ?? { "Content-Type": "application/json" },
    // });
    // debugger;
    // const result = await axios({
    //   url: apiEndpoint + "/" + path,
    //   headers: headers ?? { "Content-Type": "application/json" },
    //   method,
    //   data: body
    // });
    return result;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};
