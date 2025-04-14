import React, { useEffect, useState } from 'react';
import { getAllMembers } from '../../api/adminApi';
import { updateMemberRole, updateMemberStatus } from "../../api/adminApi";

const AdminMemberList = () => {
  const [members, setMembers] = useState([]);
  const [reload, setReload] = useState(false); // ✅ 추가

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        setMembers(data);
      } catch (err) {
        console.error("회원 목록 불러오기 실패:", err);
      }
    };
    fetchMembers();
  },  [reload]); 


  const handleRoleChange = async (memberId, newRole) => {
    try {
      await updateMemberRole(memberId, newRole);
      setReload(prev => !prev); // ✅ reload 상태 반전시켜서 새로 불러오기
    } catch (err) {
      console.error("권한 변경 실패:", err);
    }
  };

  const handleStatusChange = async (memberId, newStatus) => {
    try {
      await updateMemberStatus(memberId, newStatus);
      setReload(prev => !prev); // ✅ reload 상태 반전시켜서 새로 불러오기
    } catch (err) {
      console.error("상태 변경 실패:", err);
    }
  };
  const currentUserId = Number(localStorage.getItem("memberId"));



  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">👥 회원 관리</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">이메일</th>
            <th className="p-2">닉네임</th>
            <th className="p-2">권한</th>
            <th className="p-2">상태</th>
            <th className="p-2">가입일자</th> {/* ✅ 여기 */}
            <th className="p-2">액션</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.memberId} className="border-b">
              <td className="p-2">{member.memberId}</td>
              <td className="p-2">{member.email}</td>
              <td className="p-2">{member.nickname}</td>
              <td className="p-2">{member.role}</td>
              <td className="p-2">{member.status}</td>
              <td className="p-2">
  {new Date(member.createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })}
</td>
              <td className="p-2 space-x-2">
              <button
  onClick={() =>
    handleRoleChange(member.memberId, member.role === "일반회원" ? "관리자" : "일반회원")
  }
  disabled={member.memberId === currentUserId} // ✅ 자기 자신이면 비활성화
  className={`px-3 py-1 rounded-lg text-white font-medium transition 
    ${member.role === "관리자" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"}
    ${member.memberId === currentUserId ? "opacity-50 cursor-not-allowed" : ""}
  `}
>
  {member.role === "관리자" ? "관리자 해제" : "관리자 부여"}
</button>

  <button
    onClick={() =>
      handleStatusChange(member.memberId, member.status === "ACTIVE" ? "INACTIVE" : "ACTIVE")
    }
    disabled={member.memberId === currentUserId} // ✅ 자기 자신이면 비활성화
    className={`px-3 py-1 rounded-lg text-white font-medium transition 
      ${member.status === "INACTIVE" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
  >
    {member.status === "INACTIVE" ? "활성화" : "정지"}
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMemberList;