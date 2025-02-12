// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ProductList() {
//     const [products, setProducts] = useState([]);
//     const yourAccessToken = 'your_access_token_here'; // 인증 토큰 추가 (필요 시)

//     useEffect(() => {
//         // Spring Boot API 호출
//         axios.get('http://localhost:8080/api/crawl/products', {
//           params: {
//               url: 'https://www.aliexpress.com/category/100003109/women-clothing.html',
//               maxProducts: 10 // 가져올 상품 개수 제한
//           }
//       })
//       .then(response => {
//         console.log('API Response:', response.data);
//           setProducts(response.data);
//       })
//       .catch(error => {
//           console.error('Error fetching products:', error);
//       });
//     }, []);

//     return (
//         <div>
//             <h1>Product List</h1>
//             {products.length === 0 ? (
//                 <p>No products available.</p>
//             ) : (
//                 <ul>
//                     {products.map(product => (
//                         <li key={product.productId}>
//                             {product.name} - ${product.price}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }

// export default ProductList;
