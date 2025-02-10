import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // ✅ FontAwesome 추가
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // ✅ 돋보기 아이콘 불러오기
import "./header.css";
import logo from "../assets/logo.png"; // ✅ 로고 경로

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`검색어: ${searchQuery}`); // ✅ 검색 기능 (백엔드 연동 시 API 호출)
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* 로고 */}
        <Link to="/" className="logo">
          <img src={logo} alt="알팡당 로고" />
        </Link>

        {/* 검색창 */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>

        {/* 네비게이션 메뉴 */}
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
