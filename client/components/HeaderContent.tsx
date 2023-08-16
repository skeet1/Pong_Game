'use client'
import { FC, useState } from "react";
import "./styles/HeaderContent.scss";
import avatar from "../app/assets/man-avatar-1632965.jpg"
import gold from "../app/assets/gold.png";
import { AiOutlineBell, AiOutlineLogout } from "react-icons/ai";

interface HeaderContentProp {
  Button: string;

}

const HeaderContent: FC<HeaderContentProp> = ({ Button }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };


  return (
    <div className={`header-content`}>
    {/* <input type="checkbox" id="checkbox_toggle" />
      <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label> */}
      <div className="container">
        <div className="button-wrapper">
          <button type="submit">{Button}</button>
        </div>
        <div className="input-search">
          <form>
            <input type="search" placeholder="Search." />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="user-wrapper">
          <img className="user-img" src={avatar.src} alt="user info" />
          <div className="user-info">
            <h1>zakaria rabhi</h1>
            <div className="user-state">
              <img className="state-img" src={gold.src} alt="gold" />
              <h2>Gold</h2>
            </div>
          </div>
        </div>
        <div className="header-buttons">
          <button>
            <AiOutlineBell 
              color="hsla(0, 0%, 60%, 1)"
              style={{ width: "30px", height: "30px" }}
            />
          </button>
          <button>
            <AiOutlineLogout 
              color="hsla(0, 0%, 60%, 1)"
              style={{ width: "30px", height: "30px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
