// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ShoppingMall() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         // Spring Boot API에서 상품 목록 가져오기
//         axios.get('http://localhost:8080/api/products')
//             .then(response => {
//                 setProducts(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching products:', error);
//             });
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* <header className="bg-white shadow">
//                 <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
//                     <h1 className="text-2xl font-bold text-gray-900">알리 스타일 쇼핑몰</h1>
//                     <input
//                         type="text"
//                         placeholder="상품 검색..."
//                         className="border rounded-lg p-2 w-64 focus:outline-none"
//                     />
//                 </div>
//             </header> */}

//             <main className="max-w-7xl mx-auto mt-6 px-6">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                     {/* 카테고리 및 필터 */}
//                     <aside className="bg-white shadow rounded-lg p-4">
//                         <h2 className="font-bold text-lg mb-4">카테고리</h2>
//                         <ul className="space-y-2">
//                             <li className="text-blue-600 cursor-pointer hover:underline">여성 의류</li>
//                             <li className="text-blue-600 cursor-pointer hover:underline">남성 의류</li>
//                             <li className="text-blue-600 cursor-pointer hover:underline">전자 제품</li>
//                             <li className="text-blue-600 cursor-pointer hover:underline">생활 용품</li>
//                         </ul>
//                     </aside>

//                     {/* 상품 목록 */}
//                     <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//     {Array.isArray(products) && products.length > 0 ? ( // ✅ 배열인지 확인 후 렌더링
//         products.map(product => (
//             <div key={product.productId} className="bg-white shadow rounded-lg overflow-hidden">
//                 <img
//                     src={product.image_url || 'https://via.placeholder.com/150'}
//                     alt={product.name}
//                     className="h-48 w-full object-cover"
//                 />
//                 <div className="p-4">
//                     <h3 className="font-semibold text-lg">{product.name}</h3>
//                     <p className="text-gray-600 mt-2">{product.description}</p>
//                     <p className="mt-4 font-bold text-blue-600">${product.price}</p>
//                 </div>
//             </div>
//         ))
//     ) : (
//         <p className="text-center col-span-full text-gray-500">상품이 없습니다.</p> // ✅ 에러 방지
//     )}
// </section>
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default ShoppingMall;