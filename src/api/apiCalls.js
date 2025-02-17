import axios from "axios";
import { ApiHeaders } from "./apiHeader";
import { useCallback, useState } from "react";
import { message } from "antd";
import { env } from "../utils/constant";

export const useApiCalls = () => {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = useCallback((key, value) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  }, []);

  async function ApiCalls(
    functionName = "dummy",
    type = "get",
    route,
    params = [],
    token
  ) {
    console.log(
      "ApiCalls",
      functionName,
      type,
      route,
      typeof params,
      params,
      token
    );
    try {
      setLoading(functionName, true);
      let url = `${env.VITE_API_URL}${route}`;
      let result;

      let config = {
        method: type,
        mode: "no-core",
        maxBodyLength: Infinity,
        url: url,
        headers: ApiHeaders(type),
        data: params,
        withCredentials: true,
      };

      result = await axios.request(config);

      result = result.data;

      console.log("result***", result);

      if (result) {
        const { statusCode, messageData, isToastMessage, data = [] } = result;
        console.log("statusCode", statusCode, isToastMessage, messageData);
        // Show toast message if required
        if (isToastMessage === true) {
          message[statusCode === 200 ? "success" : "error"](messageData);
        }

        if (route === "user/login") {
          if (result?.data?.token) {
            // Save the token to the default axios headers for future requests
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${result?.data?.token}`;
            localStorage.setItem("loginUserId", result?.data?.userDetails?._id);
            localStorage.setItem("token", result?.data?.token);
            console.log("Token saved successfully:", result?.data?.token);
          } else {
            console.log("No token received");
          }
        }
      }

      return result;
    } catch (error) {
      console.log(`${route} : ${error}`);
    } finally {
      setLoading(functionName, false);
    }
  }

  return { ApiCalls, loadingStates };
};
