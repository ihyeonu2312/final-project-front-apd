import React, { useEffect, useState } from 'react';
import { getAllInquiriesForAdmin } from "../../api/inquiryApi"; // ✅ 이거로 교체
import { Link } from 'react-router-dom';

const AdminInquiryList = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getAllInquiriesForAdmin(); // ✅ 관리자용 전체 조회
        console.log("📋 관리자 전체 문의 데이터:", data);
        setInquiries(data);
      } catch (err) {
        console.error('❌ 관리자 문의 목록 조회 실패:', err);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">📋 전체 문의 리스트 (관리자)</h2>
      {inquiries.length === 0 ? (
        <p className="text-gray-500">등록된 문의가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {inquiries.map((inquiry) => (
            <li key={inquiry.inquiryId} className="border p-4 rounded shadow">
              <Link
                to={`/admin/inquiries/${inquiry.inquiryId}`}
                className="text-lg font-medium text-black hover:underline"
              >
                {inquiry.title}
              </Link>
              <p className="text-sm text-gray-500">
                작성일: {new Date(inquiry.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">
                상태:{" "}
                <span className={`font-semibold ${inquiry.status === '답변완료' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {inquiry.status === '답변완료' ? '답변완료' : '미답변'}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminInquiryList;
