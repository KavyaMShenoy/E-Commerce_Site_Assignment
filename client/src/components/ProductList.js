import { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import ProductCard from "./ProductCard";

import "../css/ProductList.css";

function ProductList(productsData) {

    const [products, setProducts] = useState(productsData["productsList"][0]);

    useEffect(() => {
        setProducts(productsData["productsList"][0]);
    }, [productsData]);

    return (
        <Container>
            <Row>

                {(productsData["productsList"][1] === "products") &&
                    (products.map((product, index) => {
                        return (
                            <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4} key={index} className="pt-5 pb-2 px-4">
                                <ProductCard product={[product, productsData["productsList"][1], productsData["productsList"][2]]} />
                            </Col>
                        )
                    }))
                }

                {(productsData["productsList"][1] === "cart") &&
                    (products.map((product, index) => {
                        return (
                            <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4} key={index} className="pt-5 pb-2 px-4">
                                <ProductCard product={[product, productsData["productsList"][1]]} />
                            </Col>
                        )
                    }))
                }

                {(productsData["productsList"][1] === "admin") &&
                    (products.map((product, index) => {
                        return (
                            <Col xs={12} sm={12} md={6} lg={6} xl={4} xxl={4} key={index} className="pt-5 pb-2 px-4">
                                <ProductCard product={[product, productsData["productsList"][1], productsData["productsList"][2], productsData["productsList"][3]]} />
                            </Col>
                        )
                    }))
                }
            </Row>
        </Container >
    )
}

export default ProductList;