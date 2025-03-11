import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { fetchCategories } from "../api/categoryApi"; // ✅ 실제 API 호출 추가

const CategoryDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories(); // ✅ API 호출
        console.log("📌 [DEBUG] 가져온 카테고리 데이터:", data); // ✅ 응답 확인
        setCategories(data);
      } catch (error) {
        console.error("카테고리 불러오기 실패:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <li
      className="dropdown"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <span>
        <FontAwesomeIcon icon={faBars} /> 모든 카테고리
      </span>
      {showDropdown && (
        <ul className="dropdown-menu">
          {categories.map((category) => (
            <li key={category.categoryId}> {/* ✅ 필드명을 categoryId로 변경 */}
              <Link to={category.url}>
                {category.categoryName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryDropdown;
