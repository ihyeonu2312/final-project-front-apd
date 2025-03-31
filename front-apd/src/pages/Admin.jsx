import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔧 관리자 페이지</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/admin/inquiries" className="p-4 border rounded-lg hover:shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2 text-black">1:1 문의 답변</h2>
          <p className="text-gray-600">고객이 남긴 문의에 답변을 등록할 수 있습니다.</p>
        </Link>

        <Link to="/admin/users" className="p-4 border rounded-lg hover:shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2 text-black">회원 관리</h2>
          <p className="text-gray-600">신고된 회원 관리 및 제재 기능을 수행합니다.</p>
        </Link>

        <Link to="/admin/products" className="p-4 border rounded-lg hover:shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2 text-black">상품 관리</h2>
          <p className="text-gray-600">상품 등록/수정/삭제 및 판매 순위 확인 기능입니다.</p>
        </Link>

        <Link to="/admin/statistics" className="p-4 border rounded-lg hover:shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2 text-black">회원 통계</h2>
          <p className="text-gray-600">가입자 수, 연령, 성별, 방문 수 등의 통계를 확인합니다.</p>
        </Link>

        <Link to="/admin/roles" className="p-4 border rounded-lg hover:shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2 text-black">권한 관리</h2>
          <p className="text-gray-600">일반 회원에게 관리자 권한을 부여할 수 있습니다.</p>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
