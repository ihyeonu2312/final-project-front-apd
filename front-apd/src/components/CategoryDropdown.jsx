import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { fetchCategories } from "../api/categoryApi";
import { convertToSlug } from "../utils";

const CategoryDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("카테고리 불러오기 실패:", error);
      }
    };
    getCategories();
  }, []);

  return (
    <li
      className={`dropdown ${showDropdown ? "open" : ""}`}
      onMouseEnter={!isMobile ? () => setShowDropdown(true) : undefined}
      onMouseLeave={!isMobile ? () => setShowDropdown(false) : undefined}
      onClick={isMobile ? () => setShowDropdown((prev) => !prev) : undefined}
    >
<span>
  <FontAwesomeIcon icon={showDropdown ? faXmark : faBars} /> 모든 카테고리
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
