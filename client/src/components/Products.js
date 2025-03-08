import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import axiosInstance from '../utils/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Container, Row, Col, Form, Button } from 'react-bootstrap';

import HeaderComponent from './Header';
import ProductList from './ProductList';

import '../css/Products.css';

function Products() {

  const [loading, setLoading] = useState(true);
  const [originalProductsData, setOriginalProductsData] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const [cart, setCart] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searched, setSearched] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
        setError('');
      } catch (error) {
        setError('Invalid token or token decoding failed:', error);
      }
    }

    const fetchProductsListData = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data.products);
        setOriginalProductsData(response.data.products);
        fetchUserId();
        fetchCartData();
        setError('');
      } catch (error) {
        setError(error?.response?.data?.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsListData();
  }, []);

  //Function to fetch products in cart.
  const fetchCartData = async () => {
    try {
      const response = await axiosInstance.get('/orders');
      if (response?.data?.orders) {
        const productArray = response.data.orders.filter(item => item.product !== null && item.product !== undefined).map(item => item.product)
        setCart(productArray);
      } else {
        setCart([]);
      }
      setError('');
    } catch (error) {
      if (error?.response?.status) {
        setCart([]);
        setError('');
      } else {
        setError(error?.response?.data?.message || 'An error occurred.');
      }
    }
  };

  //Function to add product to cart.
  const addToCart = async (product) => {
    try {
      const payload = {
        "userId": userId,
        "product": product._id
      }
      await axiosInstance.post('/orders', payload);
      alert('Product added to cart.');
      fetchCartData();
      setError('');
    } catch (error) {
      setError(error?.response?.data?.message || 'An error occurred.');
    }
  };

  //Function to search by name.
  const search = () => {
    setShowBackButton(true);
    if (searchCriteria.trim() === "") {
      setProducts([]);
      setSearched(true);
    } else {
      const filteredProducts = originalProductsData.filter((product) =>
        (product.name.toLowerCase() === searchCriteria.toLowerCase())
      );
      setProducts(filteredProducts);
      setSearched(false);
    }
  };

  const onBackButtonClick = () => {
    setSearchCriteria("");
    setProducts(originalProductsData);
    document.getElementById("searchForm").reset();
    setSearched(false);
    setShowBackButton(false);
  };

  return (
    <>
      {loading ? (
        <div className="mt-5 d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '180px' }}>
          <Spinner animation="border" role="status" style={{ color: 'lightseagreen' }} />
          <div className="mt-2" style={{ color: 'lightseagreen' }}>Loading...</div>
        </div>
      ) : (
        <div>

          <HeaderComponent cartLength={cart.length}></HeaderComponent>

          {(error !== 'Unauthorized') && (<div>
            <Container className="pt-4 px-4">
              <Button id="backButton" style={{ backgroundColor: "lightseagreen", borderColor: "lightseagreen", display: showBackButton ? "block" : "none" }} onClick={onBackButtonClick}><img className='backStyle' src="https://cdn-icons-png.flaticon.com/128/10238/10238019.png" alt="back"></img>Back</Button>
              <Row>
                <Col className="mt-2">
                  {/* Form for search by name. */}
                  <Form id="searchForm" className="searchFormContainer">
                    <Form.Control type="search" placeholder="Search by Name"
                      className="searchInput" aria-label="Search" id="searchValue" value={searchCriteria}
                      onChange={(e) => setSearchCriteria(e.target.value)} />
                    <Button variant="outline-light" className="searchButton"
                      onClick={() => search(document.getElementById("searchValue"))}>🔍</Button>
                  </Form>
                </Col>
              </Row>
            </Container>

            {/* Message to be displayed when user clicks search button without entering any input. */}
            {(!searchCriteria && searched) && (<div id="requiredMessage" className="mt-5 text-danger text-center">
              Enter a product name to search.
            </div>)}

            {/* Message to be displayed when no products are found. */}
            {products.length === 0 && searchCriteria && (
              <div id="notFoundMessage" className="mt-5 text-danger text-center">
                No Products Found.
              </div>
            )}

            {products.length > 0 && (<div style={{ marginBottom: "50px", marginTop: "10px" }}>
              <ProductList productsList={[products, "products", addToCart]} />
            </div>)}
          </div>)}

          {error && (<div className='d-flex justify-content-center text-danger' style={{ marginTop: '150px', fontSize: 'larger', fontWeight: 'bolder' }}>{error}</div>)}
        </div>
      )}
    </>
  );
}

export default Products;