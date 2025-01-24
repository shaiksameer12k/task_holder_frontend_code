import React from "react";
import { Dropdown, Menu } from "antd";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DynamicIcon from "../IconComponent/IconComponent";
import { useApiCalls } from "../../api/apiCalls";
import axios from "axios";

const UserMenu = () => {
  const { ApiCalls, loadingStates } = useApiCalls();
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === "profile") {
      return navigate("/profile");
    } else if (e.key === "logout") {
      // Handle logout logic here
      console.log("Logged out");
      return navigate("/userLoginPage");
    }
  };

  const logOutHandel = async () => {
    try {
      let params = { userName: email, password: password };
      let result = await ApiCalls(
        "logOutHandel",
        "post",
        "user/logout",
        params
      );

      if (result) {
        if (result?.statusCode === 200) {
          axios.defaults.headers.common["Authorization"] = ``;
          localStorage.clear();
          navigate("/userLoginPage");
        }
      }
    } catch (error) {
      console.log(`Error while logOutHandel ${error}`);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<FaUser />}>
        Profile
      </Menu.Item>

      <Menu.Item key="logout" icon={<FaSignOutAlt />} onClick={logOutHandel}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]}>
      <div className="flex items-center cursor-pointer">
        <DynamicIcon iconName="FaUser" color="#ff1f59c4" size={22} />
      </div>
    </Dropdown>
  );
};

export default UserMenu;
