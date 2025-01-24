import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import ButtonComponent from "../../reusable/Button/ButtonComponent";
import { useNavigate } from "react-router-dom";
import InputField from "../../reusable/InputField/InputField";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  MailOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import { useApiCalls } from "../../api/apiCalls";
// import 'antd/dist/antd.css';  // Import Ant Design styles
// import './LoginComponent.css'; // You can create a custom CSS file if needed

const LoginComponent = () => {
  let navigate = useNavigate();
  let { ApiCalls, loadingStates } = useApiCalls();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const loginApiHandel = async () => {
    if (!email) {
      return message.error("Please Fill the UserName");
    }
    if (!password) {
      return message.error("Please Fill the Password");
    }
    try {
      let params = { userName: email, password: password };
      let result = await ApiCalls(
        "loginApiHandel",
        "post",
        "user/login",
        params
      );
      console.log("loginApiHandel", result);
      if (result) {
        result?.statusCode === 200 && navigate("/layout");
      }
    } catch (error) {
      console.log(`Error while loginApi ${error}`);
    }
  };
  const testApi = async () => {
    try {
      let result = await ApiCalls("testApi", "get", "user");
      console.log("loginApiHandel", result);
    } catch (error) {
      console.log(`Error while testApi ${error}`);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  return (
    <div
      className="bg-gray-100 min-h-screen flex items-center justify-center"
      id="loginScreen"
    >
      <div className="shape01"></div>
      <div className="shape03"></div>

      <div className=" w-full max-w-md max-xl:m-2" id="loginFormContainer">
        <div
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-xl:m-2 z-1"
          id="loginForm"
        >
          <div className="text-start mb-6">
            <h2 className="text-3xl font-semibold text-primaryTextColor">
              User Sign In
            </h2>
          </div>

          <form action="#" method="POST">
            {/* Username Field */}
            <div className="mb-4"></div>
            <div className="mb-4">
              <InputField
                type="text"
                // label="username"
                name="username"
                id="inputField"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isError={""}
                isFieldVisible={true}
                layout={"vertical"}
                placeholder="User Name / Email"
                prefix={<MailOutlined />}
                style={{ padding: 0 }}
                variant="boderless"
                size="large"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <InputField
                type={showPassword ? "text" : "password"}
                // label="Password"
                name="password"
                id="inputField"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isError={""}
                isFieldVisible={true}
                layout={"vertical"}
                placeholder="Password"
                prefix={<SecurityScanOutlined />}
                suffix={
                  showPassword ? (
                    <EyeInvisibleOutlined
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeOutlined
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )
                }
                style={{ padding: 0 }}
                variant="boderless"
                size="large"
              />
            </div>

            {/* Login Button */}
            <div className="mb-4">
              {/* <Button type="primary" className="w-full py-2 text-lg rounded-md">
              
            </Button> */}
              <ButtonComponent
                name="Login"
                type="primary"
                onClick={loginApiHandel}
                size="large"
                btnStyle={{ width: "100%" }}
                loading={loadingStates?.loginApiHandel}
              />
            </div>

            {/* Sign Up Link */}
            <div className="flex justify-center items-center gap-2">
              <a
                href="/userSignUpPage"
                className="text-blue-500 text-sm hover:underline"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>

        <div className="shape02"></div>
      </div>
    </div>
  );
};

export default LoginComponent;
