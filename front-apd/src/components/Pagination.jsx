// import PropTypes from "prop-types";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   return (
//     <div className="pagination">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="pagination-button"
//       >
//         이전
//       </button>

//       {[...Array(totalPages)].map((_, index) => (
//         <button
//           key={index}
//           onClick={() => onPageChange(index + 1)}
//           className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
//         >
//           {index + 1}
//         </button>
//       ))}

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="pagination-button"
//       >
//         다음
//       </button>
//     </div>
//   );
// };

// Pagination.propTypes = {
//   currentPage: PropTypes.number.isRequired,
//   totalPages: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
// };

// export default Pagination;
