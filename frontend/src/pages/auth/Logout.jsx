import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../../recoil/userState";
import { useSetRecoilState } from "recoil";

const Logout = () => {
  const setUser = useSetRecoilState(userState);

  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      const host = `${process.env.REACT_APP_API_SERVER}/auth/logout`;
      const response = await fetch(host, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
    };
    logout();
    navigate("/");
  });

  return <div>Logging out...</div>;
};

export default Logout;
