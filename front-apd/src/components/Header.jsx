import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faQrcode, faUser, faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import logo from "../assets/logo.png";
import qrCodeImage from "../assets/qrcode.png";

const Header = () => {
  const [showQR, setShowQR] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 상태

  // ✅ 검색 이벤트 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      alert(`🔍 검색어: ${searchQuery}`);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* ✅ 로고 */}
        <Link to="/" className="logo">
          <img src={logo} alt="알팡당 로고" />
        </Link>

        {/* ✅ 검색창 */}
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

        {/* ✅ 네비게이션 메뉴 */}
        <nav className="nav">
          <ul>
            <li>
              {/* ✅ 앱 다운로드 버튼 */}
              <div
                className="app-download"
                onMouseEnter={() => setShowQR(true)}
                onMouseLeave={() => setShowQR(false)}
              >
                <FontAwesomeIcon icon={faQrcode} className="nav-icon" />
                <span>QR Code</span>
                {showQR && (
                  <div className="qr-code">
                    <img src={qrCodeImage} alt="앱 다운로드 QR 코드" />
                  </div>
                )}
              </div>
            </li>
            <li>
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} className="nav-icon" />
                로그인
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <FontAwesomeIcon icon={faCartShopping} className="nav-icon" />
                장바구니
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="category-menu">
        <ul>
          <li className="dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}>
            <span><FontAwesomeIcon icon={faBars} /> 모든카테고리</span>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/fashion">패션</Link></li>
                <li><Link to="/beauty">뷰티</Link></li>
                <li><Link to="/bags">가방</Link></li>
                <li><Link to="/appliances">가전</Link></li>
                <li><Link to="/home-interior">홈인테리어</Link></li>
                <li><Link to="/sports">스포츠</Link></li>
                <li><Link to="/jewelry">쥬얼리</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/fashion">패션</Link></li>
          <li><Link to="/beauty">뷰티</Link></li>
          <li><Link to="/used">중고거래</Link></li>
          <li><Link to="/support">고객센터</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
