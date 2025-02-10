import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="알팡당 로고" />
        </Link>
        <nav className="nav">
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/shop">쇼핑</Link></li>
            <li><Link to="/used">중고거래</Link></li>
            <li><Link to="/cart">장바구니</Link></li>
            <li><Link to="/login">로그인</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
