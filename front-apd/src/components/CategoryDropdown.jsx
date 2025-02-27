import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { fetchCategories } from "../api/categoryApi"; // ❌ API 호출 주석 처리

const CategoryDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // ✅ 더미 데이터 적용
    const dummyCategories = [
      { id: 1, name: "패션", slug: "fashion" },
      { id: 2, name: "뷰티", slug: "beauty" },
      { id: 3, name: "가방", slug: "bags" },
      { id: 4, name: "가전", slug: "appliances" },
      { id: 5, name: "홈인테리어", slug: "home-interior" },
      { id: 6, name: "스포츠", slug: "sports" },
      { id: 7, name: "쥬얼리", slug: "jewelry" },
    ];
    //     const getCategories = async () => {
    //   try {
    //     const data = await fetchCategories(); // API 호출
    //     setCategories(data); // 가져온 데이터 저장
    //   } catch (error) {
    //     console.error("카테고리 불러오기 실패:", error);
    //   }
    // };

    // getCategories();

    setCategories(dummyCategories);
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
            <li key={category.id}>
              <Link to={`/category/${category.slug}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryDropdown;
