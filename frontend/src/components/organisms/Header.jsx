import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../molecules/SearchBar";
import Button from "../../tw_components/atoms/Buttons";
import {
  Bell_icon,
  Darkmode_icon,
  Lightmode_icon,
  TempUserImg,
} from "../../images";
import { useRecoilState, useRecoilValue } from "recoil";
import UserMenu from "../molecules/UserMenu";
import { userMenuState } from "../../recoil/userMenuState";
import { userState } from "../../recoil/userState";
import { tempUserInfo } from "../../recoil/tempuserinfo";

const Header = () => {
  const [menuOpen, setMenuOpen] = useRecoilState(userMenuState);
  const [{ user }, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const init = () => {
    setUser(tempUserInfo);
    console.log("Temp User Initialized.");
  };

  const toggleUserMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async (query) => {
    try {
      navigate(`/search/1?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.log(`error :`, error);
    }
  };

  return (
    <>
      <div className="sticky top-0 w-[100%] h-[80px] border-b flex flex-row items-center justify-center z-30 bg-white">
        <div className="w-[40%] flex flex-row items-center justify-around">
          <Link to={"/"} className="font-logo text-4xl text-accent-blue ">
            Stacker-Labs
          </Link>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="w-[60%] flex flex-row justify-evenly items-center">
          {user.role === "ADMIN" && (
            <Link to={"/admin"}>
              <Button variant={"white"} size={"md"}>
                Admin
              </Button>
            </Link>
          )}
          <Link to={"/boards"}>
            <Button variant={"white"} size={"md"}>
              Create Post
            </Button>
          </Link>
          {user.id ? (
            <Link to={"/auth/logout"}>
              <Button variant={"white"} size={"md"}>
                Logout
              </Button>
            </Link>
          ) : (
            <Link to={"/auth"}>
              <Button variant={"white"} size={"md"}>
                Login
              </Button>
            </Link>
          )}
          {!user.id && (
            <Link to={"/auth/register"}>
              <Button variant={"white"} size={"md"}>
                Sign Up
              </Button>
            </Link>
          )}
          <Button onClick={init} variant={"white"} size={"md"}>
            Init
          </Button>
          <button>
            <img className="w-[70%]" src={Darkmode_icon} alt="dark mode icon" />
          </button>
          <button>
            <img
              className="w-[70%]"
              src={Lightmode_icon}
              alt="dark mode icon"
            />
          </button>
          <button>
            <img className="w-[70%]" src={Bell_icon} alt="dark mode icon" />
          </button>
          {user.id && (
            <img
              onClick={toggleUserMenu}
              className="w-[40px] h-[40px] rounded-3xl cursor-pointer"
              src={user.image}
              alt=""
            />
          )}
        </div>
      </div>

      {menuOpen && <UserMenu userid={user.id} />}
    </>
  );
};

export default Header;
