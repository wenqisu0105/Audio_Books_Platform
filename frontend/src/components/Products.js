import { Link } from "react-router-dom";
import Rating from "./Rating";
function Product(props) {
    const {product } = props;
    return ( <div className="product" key={product.slug}>
    <Link href={`/product/${product.slug}`}>
    <img src={product.image} alt={product.name} width="200" height="300" />
    </Link>
    <div className="product-info"> 
    <Link href={`/product/${product.slug}`}>
    <p>{product.name}</p>
    </Link>
    <Rating rating={product.rating} numReview={product.numReview} />
    <p><strong>${product.price}</strong></p>
    <div className="readmore">
    <p>{product.description}</p>
    </div>
    <div className="b">
    <button>add to cart</button>
    </div>
    </div>
  </div>)
}
export default Product