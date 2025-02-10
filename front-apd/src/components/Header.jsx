import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faQrcode, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import logo from "../assets/logo.png";
import qrCodeImage from "../assets/qrcode.png";

const Header = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* ✅ 로고 */}
        <Link to="/" className="logo">
          <img src={logo} alt="알팡당 로고" />
        </Link>

        {/* ✅ 검색창 */}
        <div className="search-form">
          <input type="text" placeholder="검색어를 입력하세요..." />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

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
            <li><Link to="/used">중고거래</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
