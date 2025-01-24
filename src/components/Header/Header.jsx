import React, { useEffect, useState } from "react";

import UserMenu from "../../reusable/CustomMenu/CustomMenu";

import { useApiCalls } from "../../api/apiCalls";

const Header = ({ scrollY, isAdimn }) => {
  let loginUserId = localStorage.getItem("loginUserId");
  let { ApiCalls, loadingStates } = useApiCalls();
  const [userData, setUserData] = useState({});
  const getuserProfileApiHandel = async () => {
    try {
      let result = await ApiCalls(
        "getuserProfileApiHandel",
        "get",
        `user/profile?userId=${loginUserId}`
      );

      if (result) {
        setUserData(result?.data);
        console.log("getuserProfileApiHandel", result);
      }
    } catch (error) {
      console.log(`Error while getuserProfileApiHandel ${error}`);
    }
  };

  useEffect(() => {
    getuserProfileApiHandel();
  }, []);

  return (
    <header
      id="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 3,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: scrollY > 50 ? "#F5F3F6" : "#ffffff",
        boxShadow: scrollY > 50 ? "0px 3px 10px rgba(0,0,0,0.3)" : "none",
        transition: "all easy-in-out .5s",
        justifyContent: "space-between",
        padding: "0px 20px",
        height: "50px",
      }}
    >
      <h3
        id="header_logo "
        className="text-3xl font-sans font-bold text-primaryTextColor"
      >
        Task Holder
      </h3>

      <div className="flex gap-1 items-end">
        <span className="text-sm font-sans font-bold">
          {userData?.userName}
        </span>
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
