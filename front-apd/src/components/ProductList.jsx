import ProductCard from "./ProductCard";
import "../styles/Product.css";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.productId} product={product} />)
      ) : (
        <p>상품이 없습니다.</p>
      )}
    </div>
  );
};

export default ProductList;

