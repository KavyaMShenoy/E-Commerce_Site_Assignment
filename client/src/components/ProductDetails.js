import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import axiosInstance from '../utils/auth';

import { Spinner, Container, Row, Col, Card, Button } from 'react-bootstrap';

import "../css/ProductCard.css";

function ProductDetails() {

    const productId = useParams()?.id;

    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [product, setProduct] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axiosInstance.get(`/products/details/${productId}`);
                setProduct(response.data.product);
                fetchUserId();
                setError('');
            } catch (error) {
                setError(error?.response?.data?.message || 'An error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

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

    //Function to add product to cart.
    const addToCart = async (product) => {
        try {
            const payload = {
                "userId": userId,
                "product": product._id
            }
            await axiosInstance.post('/orders', payload);
            alert('Product added to cart.');
            setError('');
        } catch (error) {
            setError(error?.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <>
            {loading ? (
                <div className="mt-5 d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '180px' }}>
                    <Spinner animation="border" role="status" style={{ color: 'lightseagreen' }} />
                    <div className="mt-2" style={{ color: 'lightseagreen' }}>Loading...</div>
                </div>
            ) : (
                error ? (
                    <div className='d-flex justify-content-center text-danger' style={{ marginTop: '150px', fontSize: 'larger', fontWeight: 'bolder' }}>
                        {error}
                    </div>
                ) : (
                    <Container className='pt-5'>
                        <Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>
                            <Button id="backButton" style={{ backgroundColor: "lightseagreen", borderColor: "lightseagreen" }}>
                                <img className='backStyle' src="https://cdn-icons-png.flaticon.com/128/10238/10238019.png" alt="back"></img>
                                Back
                            </Button>
                        </Link>

                        <Row className="p-3 d-flex justify-content-center">
                            <Card style={{ backgroundColor: "lightseagreen" }} className="text-light d-flex flex-column flex-lg-row">
                                <Col lg={6} md={12} className="mb-4 d-flex justify-content-center align-items-center">
                                    <Card.Img
                                        variant="top"
                                        className="img-fluid w-100"
                                        src={product.imageURL}
                                        alt={product.name}
                                        style={{
                                            objectFit: 'contain',
                                            maxWidth: '100%',
                                            height: 'auto',
                                        }}
                                    />
                                </Col>

                                <Col lg={6} md={12} className="mb-4 d-flex flex-column justify-content-between">
                                    <Card.Body>
                                        <Card.Title><h1>{product.name}</h1></Card.Title>

                                        <Card.Text className="mt-3" style={{ fontSize: "larger" }}>
                                            <span><b>Price : </b>Rs {product.price}</span>
                                            <br /><br />
                                            <span><b>Product description : </b>{product.description}</span>
                                            <br /><br />
                                            <span><b>Stock : </b>{product.stock}</span>
                                        </Card.Text>

                                        <Button variant="light" className="mt-3" style={{ color: "teal" }} onClick={() => addToCart(product)}>
                                            Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Col>
                            </Card>
                        </Row>
                    </Container>
                )
            )}
        </>
    );
}

export default ProductDetails;
