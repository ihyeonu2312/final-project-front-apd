import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInquiryDetail, getAdminInquiryDetail } from "../../api/inquiryApi"; // ✅ 관리자용 함수도 import

const InquiryDetail = () => {
  const { inquiryId } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [error, setError] = useState(false);

  // ✅ 현재 경로에 "/admin"이 포함되어 있으면 관리자 페이지로 간주
  const isAdminPage = window.location.pathname.includes('/admin');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = isAdminPage
          ? await getAdminInquiryDetail(inquiryId)
          : await getInquiryDetail(inquiryId);
        setInquiry(data);
      } catch (err) {
        console.error('문의 상세 조회 실패:', err);
        setError(true);
      }
    };

    fetchDetail();
  }, [inquiryId]);

  if (error) return <p className="text-center text-red-500 mt-10">❌ 문의를 불러오지 못했습니다.</p>;
  if (!inquiry) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{inquiry.title}</h2>
      <p className="text-sm text-gray-500">상태: {inquiry.status}</p>
      <p className="text-gray-500 text-sm mb-4">작성일: {new Date(inquiry.createdAt).toLocaleString()}</p>
      <p className="text-gray-700 mb-6 whitespace-pre-line">{inquiry.questionText}</p>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">📢 관리자 답변</h3>
      {inquiry.responses.length === 0 ? (
        <p className="text-gray-500">아직 답변이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {inquiry.responses.map((res) => (
            <li key={res.responseId} className="border p-4 rounded">
              <h4 className="font-semibold text-lg">{res.title}</h4>
              <p className="text-gray-500 text-sm">답변일: {new Date(res.responseDate).toLocaleString()}</p>
              <p className={`text-sm ${inquiry.status === '답변완료' ? 'text-green-600' : 'text-orange-600'}`}>
                상태: {inquiry.status}
              </p>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{res.responseText}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InquiryDetail;
