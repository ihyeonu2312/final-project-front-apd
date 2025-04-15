import React, { useEffect, useState } from 'react';
import { getAllInquiriesForAdmin } from "../../api/inquiryApi";
import { Link } from 'react-router-dom';

const AdminInquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyPending, setShowOnlyPending] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getAllInquiriesForAdmin();
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 최신순 정렬
        setInquiries(sorted);
      } catch (err) {
        console.error('❌ 관리자 문의 목록 조회 실패:', err);
      }
    };
    fetchInquiries();
  }, []);


  const [searchInput, setSearchInput] = useState(""); // 입력창 값
  const [searchKeyword, setSearchKeyword] = useState(""); // 실제 검색 키워드
  const [searchType, setSearchType] = useState("title");
  

  // ✅ 필터링 (답변대기만 보기)
  const filteredInquiries = inquiries
  .filter(inquiry => showOnlyPending ? inquiry.status !== "답변완료" : true)
  .filter(inquiry => {
    const keyword = searchKeyword.toLowerCase();
    if (searchType === "title") return inquiry.title.toLowerCase().includes(keyword);
    if (searchType === "writer") return inquiry.memberNickname.toLowerCase().includes(keyword);
    if (searchType === "content") return inquiry.content?.toLowerCase().includes(keyword);
    return true;
  });






  // ✅ 페이지네이션 계산
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInquiries.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">📋 전체 문의 리스트 (관리자)</h2>

      {/* ✅ 필터 토글 버튼 */}
      <div className="mb-4">
      <div className="flex items-center gap-2">
    <select
      value={searchType}
      onChange={(e) => setSearchType(e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="title">제목</option>
      <option value="writer">작성자</option>
      <option value="content">내용</option>
    </select>
    <input
  type="text"
  placeholder="검색어 입력"
  value={searchInput}
  onChange={(e) => setSearchInput(e.target.value)} // ← 입력은 input에만 반영
  className="border rounded px-3 py-2 w-64"
/>
<button
  onClick={() => {
    setSearchKeyword(searchInput); // 버튼 누를 때만 검색 키워드 반영
    setCurrentPage(1);
  }}
  className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
>
  검색
</button>
  </div>
        <button
          onClick={() => {
            setShowOnlyPending(prev => !prev);
            setCurrentPage(1); // 필터 바꾸면 첫 페이지로
          }}
          className="px-4 py-2 rounded bg-black text-white hover:bg-gray-600"
        >
          {showOnlyPending ? "전체 보기" : "답변대기만 보기"}
        </button>
      </div>

      {/* ✅ 게시판 테이블 */}
      {filteredInquiries.length === 0 ? (
        <p className="text-gray-500">등록된 문의가 없습니다.</p>
      ) : (
        <>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold">
                <th className="p-2 border">번호</th>
                <th className="p-2 border">제목</th>
                <th className="p-2 border">작성자</th>
                <th className="p-2 border">작성일</th>
                <th className="p-2 border">상태</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((inquiry, index) => (
                <tr key={inquiry.inquiryId} className="text-sm hover:bg-gray-50">
                  <td className="p-2 border text-center">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="p-2 border">
                    <Link
                      to={`/admin/inquiries/${inquiry.inquiryId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {inquiry.title}
                    </Link>
                  </td>
                  <td className="p-2 border">{inquiry.memberNickname}</td>
                  <td className="p-2 border">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <span
                      className={`font-semibold ${
                        inquiry.status === '답변완료'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {inquiry.status === '답변완료' ? '답변완료' : '답변대기'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ 페이지네이션 버튼 */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminInquiryList;
