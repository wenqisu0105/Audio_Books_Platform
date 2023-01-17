import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger"
import Product from "../components/Products";
import { Helmet } from "react-helmet-async";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import data from "../data"
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
    return <div>
      <Helmet>
        <title>AudioBooks</title>
      </Helmet>
      <h1 align="center">Bestsellers of the month</h1>
    <div className="products">
    {loading ? (
           <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
      products.map(product => (
        <span key={product.slug}> 
          <Product product={product} ></Product>
          </span>
     )))
    }
    </div></div>
}
export default HomeScreen