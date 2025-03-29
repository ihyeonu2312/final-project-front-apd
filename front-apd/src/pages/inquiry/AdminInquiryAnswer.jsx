import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInquiryDetail, createInquiryResponse } from "../../api/inquiryApi";

const AdminInquiryAnswer = () => {
  const { inquiryId } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState(null);
  const [title, setTitle] = useState('');
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getInquiryDetail(inquiryId);
        setInquiry(data);
      } catch (err) {
        console.error('문의 상세 조회 실패:', err);
      }
    };

    fetchDetail();
  }, [inquiryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createInquiryResponse({
        inquiryId: Number(inquiryId),
        title,
        responseText,
      });
      alert('답변이 등록되었습니다.');
      navigate('/admin/inquiries');
    } catch (err) {
      console.error('답변 등록 실패:', err);
      alert('답변 등록에 실패했습니다.');
    }
  };

  if (!inquiry) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">문의 답변</h2>
      <p className="text-sm text-blue-700 font-medium mb-2">
  상태: {inquiry.status}
</p>
      <div className="border rounded p-4 mb-6 bg-gray-50">
        <h3 className="text-xl font-semibold mb-2">{inquiry.title}</h3>
        <p className="text-gray-500 text-sm mb-2">작성일: {new Date(inquiry.createdAt).toLocaleString()}</p>
        <p className="text-gray-700 whitespace-pre-line">{inquiry.questionText}</p>
      </div>

      <form onSubmit={handleSubmit} className="border rounded p-4 shadow">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">답변 제목</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">답변 내용</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={6}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          답변 등록
        </button>
      </form>
    </div>
  );
};

export default AdminInquiryAnswer;
