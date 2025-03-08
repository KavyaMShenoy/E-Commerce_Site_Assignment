
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axiosInstance from '../utils/auth';

import { Spinner, Button } from 'react-bootstrap';

import ProductList from './ProductList';

import '../css/Cart.css';

function CartComponent() {

    const [cartValue, setCartValue] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axiosInstance.get('/orders');
                if (response?.data?.orders) {
                    const productArray = response.data.orders.filter(item => item.product !== null && item.product !== undefined).map(item => item.product)
                    setCartValue(productArray);
                    const total = productArray.reduce((sum, product) => sum + product.price, 0);
                    setTotalPrice(total);
                } else {
                    setCartValue([]);
                    setTotalPrice(0);
                }
                setError('');
            } catch (error) {
                setError(error?.response?.data?.message || 'An error ocuured.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [])

    return (
        <>
            <header style={{ backgroundColor: "lightseagreen" }} className="p-4 text-light">
                <h1 className='text-center'>Cart</h1>
            </header>

            {loading ? (
                <div className="mt-5 d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '180px' }}>
                    <Spinner animation="border" role="status" style={{ color: 'lightseagreen' }} />
                    <div className="mt-2" style={{ color: 'lightseagreen' }}>Loading...</div>
                </div>
            ) :
                (
                    !error ?
                        (
                            <div>
                                <Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>
                                    <Button id="backButton" className='m-3' style={{ backgroundColor: "lightseagreen", borderColor: "lightseagreen" }}>
                                        <img className='backStyle' src="https://cdn-icons-png.flaticon.com/128/10238/10238019.png" alt="back"></img>
                                        Back
                                    </Button>
                                </Link>

                                <div className='m-4'><b style={{ fontSize: "larger", color: 'teal' }}>Total Items Added :</b> <span style={{ color: 'teal' }}>{cartValue.length}</span> </div>

                                <div className="m-4"><b style={{ fontSize: "larger", color: 'teal' }}>Total Price :</b> <span style={{ color: 'teal' }}>Rs {totalPrice}</span> </div>

                                {(cartValue.length > 0) &&
                                    <div className="m-4" style={{ border: "5px solid lightseagreen", paddingBottom: "50px", paddingTop: "10px" }}>
                                        <ProductList productsList={[cartValue, "cart"]} />
                                    </div>
                                }

                                {(cartValue.length === 0) &&
                                    <div className='text-center p-4' style={{ fontSize: "large", fontWeight: "bold" }}>Please add items to cart to view them.</div>
                                }
                            </div>
                        ) :
                        (
                            <div className='d-flex justify-content-center text-danger' style={{ marginTop: '150px', fontSize: 'larger', fontWeight: 'bolder' }}>{error}</div>
                        )
                )}
        </>
    )
}

export default CartComponent;