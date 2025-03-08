import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import '../css/Home.css';

function Home() {

    return (
        <>
            <header style={{ backgroundColor: 'lightseagreen' }} className="p-4 text-light d-flex justify-content-between align-items-center">
                <h1 className="mx-auto">Welcome to Shopit</h1>
                <div className="d-flex flex-column align-items-center p-1" style={{ border: '3px solid white', borderRadius: '5px' }}>
                    <img
                        src="https://th.bing.com/th?id=OIP.WjKuPHyCdWrR4SuvXwRASAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                        alt="user icon"
                        style={{ borderRadius: '50%', height: '50px', width: '50px' }}
                    />
                    <Link to='/login' style={{ textDecoration: 'none' }}><Button className="home-button mt-1" type="submit">Log out</Button></Link>
                </div>
            </header>

            <Container className="mt-5">
                <Row className="d-flex justify-content-center">
                    <Col md={4} className='mb-4'>
                        <Link to='/admin' style={{ textDecoration: 'none' }}>
                            <Card className='home-card'>
                                <Card.Img
                                    variant="top"
                                    src="https://th.bing.com/th/id/OIP.wQFQco1izbZGsWcSyy9aUQHaHa?w=199&h=199&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                                    alt="Admin Icon" style={{ height: '300px' }}
                                />
                                <Card.Body>
                                    <Card.Text className='d-flex justify-content-center'>
                                        <span style={{ fontSize: 'larger', color: 'teal', fontWeight: 'bolder' }}>Admin</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col md={1}></Col>

                    <Col md={4} className='mb-4'>
                        <Link to='/products' style={{ textDecoration: 'none' }}>
                            <Card className='home-card'>
                                <Card.Img
                                    variant="top"
                                    src="https://th.bing.com/th?id=OIP.l3BvMxlb7oMstBEG7Ciy_AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                                    alt="Products icon" style={{ height: '300px' }}
                                />
                                <Card.Body>
                                    <Card.Text className='d-flex justify-content-center'>
                                        <span style={{ fontSize: 'larger', color: 'teal', fontWeight: 'bolder' }}>Products</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;
