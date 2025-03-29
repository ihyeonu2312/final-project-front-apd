import React, { useEffect, useState } from 'react';
import { getMyInquiries } from "../../api/inquiryApi";
import { Link } from 'react-router-dom';

const MyInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getMyInquiries();
        console.log("🔍 가져온 문의 데이터:", data); // ✅ 추가
        setInquiries(data);
      } catch (err) {
        console.error('문의 목록 조회 실패:', err);
      }
    };
  
    fetchInquiries();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">내 문의 내역</h2>
      {inquiries.length === 0 ? (
        <p className="text-gray-500">작성한 문의가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {inquiries.map((inquiry) => (
            <li key={inquiry.inquiryId} className="border p-4 rounded shadow">
              <Link to={`/inquiries/${inquiry.inquiryId}`} className="text-xl font-semibold hover:underline">
                {inquiry.title}
              </Link>
              <p className="text-gray-500 text-sm">작성일: {new Date(inquiry.createdAt).toLocaleString()}</p>
              <p className="text-gray-700 mt-1 line-clamp-2">{inquiry.questionText}</p>
              <p className="text-sm text-gray-700">
  상태: {inquiry.status}
</p>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyInquiries;
