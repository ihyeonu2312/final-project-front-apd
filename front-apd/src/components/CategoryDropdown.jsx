import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { fetchCategories } from "../api/categoryApi"; // ✅ API 추가
import { convertToSlug } from "../utils"; // ✅ URL 변환

const CategoryDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories(); // ✅ API 호출
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
            <li key={category.categoryId}>
              <Link to={`/category/${convertToSlug(category.categoryName)}`}>
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
