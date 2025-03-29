import React, { useState } from 'react';
import { createInquiry } from "../../api/inquiryApi";
import { useNavigate } from 'react-router-dom';

const InquiryWrite = () => {
  const [title, setTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createInquiry({ title, questionText });
      alert('문의가 등록되었습니다.');
      navigate('/inquiries');
    } catch (err) {
      console.error(err);
      alert('문의 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">문의 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">제목</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">내용</label>
          <textarea
            className="w-full p-2 border rounded"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={6}
            required
          />
        </div>
       <button
  type="submit"
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  disabled={loading}
>
  {loading ? '등록 중...' : '등록하기'}
</button>

      </form>
    </div>
  );
};

export default InquiryWrite;
