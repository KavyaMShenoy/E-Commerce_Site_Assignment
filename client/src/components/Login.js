import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../utils/auth';

import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner, Container, Button } from 'react-bootstrap';

import '../css/Login.css';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setError('');
            navigate('/home');
        } catch (error) {
            setError(error?.response?.data?.message || 'An error occured.');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1800);
        }
    };

    return (
        <>
            <header className='login-header'>
                <h1 style={{ justifyContent: 'center' }}>Login</h1>
            </header>

            {loading ? (
                <div className="mt-5 d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '180px' }}>
                    <Spinner animation="border" role="status" style={{ color: 'lightseagreen' }} />
                    <div className="mt-2" style={{ color: 'lightseagreen' }}>Logging in...</div>
                </div>) : (
                <Container className='mt-5 p-3 text-center login-form'>

                    <div>
                        <img className='login-img' src="data:image/jpeg;base64,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" alt="User Icon" />
                    </div>
                    <form onSubmit={onFormSubmit} className='mt-4'>

                        <div>
                            <label className='login-label'>Email : </label>
                            <br />
                            <input className='mt-2 login-input'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label className='login-label'>Password : </label>
                            <br />
                            <input className='mt-2 login-input'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className='text-center mt-4'>
                            <Button className="p-1 login-button" type="submit">Login</Button>
                            <br />
                            <span className='mt-1' style={{ color: 'teal' }}>Not registered yet? <Link to="/register" style={{ color: 'lightseagreen' }}><b>Register here</b></Link></span>
                        </div>

                        {error && <span className='text-center text-danger mt-1'>{error}</span>}

                    </form>
                </Container>
            )}

        </>
    );
};

export default Login;
