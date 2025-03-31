import React, { useEffect, useState } from 'react';
import { getMyInquiries } from "../../api/inquiryApi";
import { Link } from 'react-router-dom';

const MyInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getMyInquiries();
        console.log("🔍 가져온 문의 데이터:", data);
        setInquiries(data);
      } catch (err) {
        console.error('문의 목록 조회 실패:', err);
      }
    };

    fetchInquiries();
  }, []);

    return (
      <div className="w-full px-8 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">📋 내 문의 내역</h2>
    
        {inquiries.length === 0 ? (
          <p className="text-gray-500 text-center">작성한 문의가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full table-fixed border border-gray-200 text-sm text-left">
  <thead className="bg-gray-100 text-gray-700">
    <tr>
      <th className="py-3 px-4 border-b w-1/2">제목</th>
      <th className="py-3 px-4 border-b w-1/4">작성일</th>
      <th className="py-3 px-4 border-b w-1/4">상태</th>
    </tr>
  </thead>
  <tbody>
    {inquiries.map((inquiry) => (
      <tr key={inquiry.inquiryId} className="hover:bg-gray-50">
        <td className="py-3 px-4 border-b truncate">
          <Link
            to={`/inquiries/${inquiry.inquiryId}`}
            className="text-blue-600 hover:underline font-medium"
          >
            {inquiry.title}
          </Link>
        </td>
        <td className="py-3 px-4 border-b text-gray-600">
          {new Date(inquiry.createdAt).toLocaleDateString()}
        </td>
        <td className="py-3 px-4 border-b">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold 
              ${inquiry.status === '답변완료' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
          >
            {inquiry.status}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      )}
    </div>
  );
};

export default MyInquiries;
