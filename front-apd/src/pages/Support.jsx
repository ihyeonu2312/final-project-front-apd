// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Support.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faComments } from "@fortawesome/free-solid-svg-icons";


// const Support = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("myQuestions"); // ✅ 현재 선택된 탭

//   // ✅ 내가 남긴 문의 목록 (샘플 데이터)
//   const [myQuestions, setMyQuestions] = useState([
//     { 
//       id: 1, 
//       title: "배송이 너무 지연돼요.", 
//       content: "주문한 상품이 아직 도착하지 않았어요. 배송이 언제 될까요?", 
//       answer: "현재 물류량 증가로 인해 배송이 지연되고 있습니다. 빠른 시일 내에 출고될 예정입니다.", 
//       isOpen: false
//     },
//     { 
//       id: 2, 
//       title: "환불 신청은 어떻게 하나요?", 
//       content: "상품이 마음에 들지 않아서 환불하고 싶어요. 절차를 알려주세요.", 
//       answer: "마이페이지에서 환불 요청 후, 3일 이내 처리가 됩니다.", 
//       isOpen: false
//     }
//   ]);

//   // ✅ 자주 묻는 질문(FAQ) (샘플 데이터)
//   const [faq, setFaq] = useState([
//     { id: 1, question: "주문 취소는 어떻게 하나요?", answer: "결제 후 24시간 이내에는 마이페이지에서 직접 취소 가능합니다.", isOpen: false },
//     { id: 2, question: "교환 및 반품은 어디서 신청하나요?", answer: "마이페이지 > 주문내역에서 교환 및 반품을 신청할 수 있습니다.", isOpen: false },
//     { id: 3, question: "배송 조회는 어디서 하나요?", answer: "마이페이지 > 주문내역에서 배송 상태를 확인할 수 있습니다.", isOpen: false }
//   ]);

//   // ✅ 문의글 & FAQ의 펼치기/접기 기능
//   const toggleAnswer = (id, type) => {
//     if (type === "question") {
//       setMyQuestions(myQuestions.map(q => q.id === id ? { ...q, isOpen: !q.isOpen } : q));
//     } else if (type === "faq") {
//       setFaq(faq.map(f => f.id === id ? { ...f, isOpen: !f.isOpen } : f));
//     }
//   };

//   return (
//     <div className="support-container">
//       <h1>고객센터</h1>



//       {/* ✅ 탭 메뉴 */}
//       <div className="tab-menu">
//         <button className={activeTab === "myQuestions" ? "active" : ""} onClick={() => setActiveTab("myQuestions")}>
//           내가 남긴 문의
//         </button>
//         <button className={activeTab === "faq" ? "active" : ""} onClick={() => setActiveTab("faq")}>
//           자주 묻는 질문
//         </button>
//         {/* ✅ 1:1 문의하기 (버튼 대신 텍스트 + 아이콘) */}
//         <div className="support-inquiry" onClick={() => navigate("/support/write")}>
//                 <FontAwesomeIcon icon={faComments} className="support-icon" />
//                 <span>1:1 문의하기</span>
//               </div>
//       </div>

//       {/* ✅ "내가 남긴 문의" 탭 */}
//       {activeTab === "myQuestions" && (
//         <div className="tab-content">
//           <h2>내가 남긴 문의</h2>
//           <ul className="support-list">
//             {myQuestions.length === 0 ? (
//               <p>등록된 문의가 없습니다.</p>
//             ) : (
//               myQuestions.map(q => (
//                 <li key={q.id} className="support-item">
//                   <div className="question-header">
//                     <h3>{q.title}</h3>
//                     <button className="toggle-button" onClick={() => toggleAnswer(q.id, "question")}>
//                       {q.isOpen ? "▲" : "▼"}
//                     </button>
//                   </div>
//                   {q.isOpen && (
//                     <div className="question-details">
//                       <p className="question-content"><strong>내 문의:</strong> {q.content}</p>
//                       <p className="answer"><strong>운영자 답변:</strong> {q.answer}</p>
//                     </div>
//                   )}
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}

//       {/* ✅ "자주 묻는 질문(FAQ)" 탭 */}
//       {activeTab === "faq" && (
//         <div className="tab-content">
//           <h2>자주 묻는 질문</h2>
//           <ul className="support-list">
//             {faq.map(f => (
//               <li key={f.id} className="support-item">
//                 <div className="question-header">
//                   <h3>{f.question}</h3>
//                   <button className="toggle-button" onClick={() => toggleAnswer(f.id, "faq")}>
//                     {f.isOpen ? "▲" : "▼"}
//                   </button>
//                 </div>
//                 {f.isOpen && <p className="answer">{f.answer}</p>}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Support;
