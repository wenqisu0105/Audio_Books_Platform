
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
    return ( <div className="product" key={product.slug}>
    <Link to={`/product/${product.slug}`}>
    <img src={product.image} alt={product.name} width="200" height="300" />
    </Link>
    <div className="product-info"> 
    <Link to={`/product/${product.slug}`}>
    <p>{product.name}</p>
    </Link>
    <Rating rating={product.rating} numReview={product.numReview} />
    <p><strong>${product.price}</strong></p>
    <div className="readmore">
    <p>{product.description}</p>
    </div>
    <div className="b">
    {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
    </div>
    </div>
  </div>)
}
export default Product;