// import React, { useState } from 'react';
// import axios from 'axios';

// function AddProduct() {
//     const [product, setProduct] = useState({
//         name: '',
//         description: '',
//         price: '',
//         stockQuantity: ''
//     });

//     const handleChange = (e) => {
//         setProduct({ ...product, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         axios.post('http://localhost:8080/api/products', product)
//             .then(response => {
//                 alert('상품이 추가되었습니다!');
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.error('Error adding product:', error);
//             });
//     };

//     return (
//         <div>
//             <h1>Add Product</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Product Name"
//                     value={product.name}
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="text"
//                     name="description"
//                     placeholder="Description"
//                     value={product.description}
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="number"
//                     name="price"
//                     placeholder="Price"
//                     value={product.price}
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="number"
//                     name="stockQuantity"
//                     placeholder="Stock Quantity"
//                     value={product.stockQuantity}
//                     onChange={handleChange}
//                 />
//                 <button type="submit">Add Product</button>
//             </form>
//         </div>
//     );
// }

// export default AddProduct;
