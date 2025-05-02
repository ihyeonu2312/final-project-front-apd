import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // ✅ Zustand 상태 가져오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass, faQrcode, faUser, faCartShopping, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import logo from "../assets/logo.png";
import qrCodeImage from "../assets/qrcode.png";
import CategoryDropdown from "./CategoryDropdown";




const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ 모바일 메뉴 상태
  const [showQR, setShowQR] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 상태
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // ✅ Zustand에서 로그인 상태 가져오기
  const { user, logout } = useAuthStore();
  
  // 📌 검색 이벤트 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // 📌 로그아웃 핸들러
  const handleLogout = () => {
    logout();
    navigate("/"); // 로그아웃 후 메인 페이지로 이동
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* ✅ 로고 */}
        <Link to="/" className="logo">
          <img src={logo} alt="알팡당 로고" />
        </Link>

        {/* ✅ 햄버거 버튼 (모바일 전용) */}
<button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
  <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
</button>


        {/* ✅ 검색창 */}
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
        {!isMobile && (
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

            {/* ✅ 로그인 상태일 때 닉네임 & 로그아웃 버튼 표시 */}
            {user ? (
              <>
                <li><FontAwesomeIcon icon={faUser} className="nav-icon" />
                <Link to= {user.role === '관리자' ? '/admin' : '/user/my-info'}className="user-nickname">
  {user.nickname}
</Link>
                </li>
                <li>
              <Link to="/user/cart">
                <FontAwesomeIcon icon={faCartShopping} className="nav-icon" />
                장바구니
              </Link>
            </li>

                <li>
                  <Link to="/" onClick={handleLogout}>
                    로그아웃
                  </Link>
                </li>
              </>
            ) : (
              <>
              <li>
                <Link to="/login">
                  <FontAwesomeIcon icon={faUser} className="nav-icon" />
                  로그인
                </Link>
              </li>
              <li>
              <Link to="/user/cart">
                <FontAwesomeIcon icon={faCartShopping} className="nav-icon" />
                장바구니
              </Link>
            </li>
              </>
            )}

          </ul>
        </nav>
        )}
      </div>

      
{/* ✅ 모바일 메뉴 (토글됨) */}
<nav className={`mobile-nav ${menuOpen ? "open" : ""}`}>
  <ul>
    <li><Link to="/used-products">중고거래</Link></li>
    <li>
      <Link to={user?.role === '관리자' ? '/admin' : '/inquiries'}>
        {user?.role === '관리자' ? 'admin page' : '고객센터'}
      </Link>
    </li>
    {user ? (
      <>
        <li><Link to={user.role === '관리자' ? '/admin' : '/user/my-info'}>{user.nickname}</Link></li>
        <li><Link to="/user/cart">장바구니</Link></li>
        <li><Link to="/" onClick={handleLogout}>로그아웃</Link></li>
        <CategoryDropdown />
      </>
    ) : (
      <>
        <li><Link to="/login">로그인</Link></li>
        <li><Link to="/user/cart">장바구니</Link></li>
      </>
    )}
  </ul>
</nav>
{!isMobile && (
      <div className="category-menu">
        <ul>
          <CategoryDropdown />

          <li><Link to="/category/패션의류-잡화">패션의류/잡화</Link></li>
          <li><Link to="/category/생활용품">생활용품</Link></li>
          <li><Link to="/used-products">중고거래</Link></li>
          <li>
  <Link to={user?.role === '관리자' ? '/admin' : '/inquiries'}>
    {user?.role === '관리자' ? 'admin page' : '고객센터'}
  </Link>
</li>

        </ul>
      </div>
      )}
      
    </header>
  );
};

export default Header;
