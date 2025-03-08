import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../utils/auth';

import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner, Container, Button } from 'react-bootstrap';

import '../css/Register.css';

const Register = () => {
    
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('/auth/register', { name,email, password, role });
            localStorage.setItem('token', response.data.token);
            setError('');
            navigate('/login');
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
            <header className='register-header'>
                <h1 style={{ justifyContent: 'center' }}>Register</h1>
            </header>

            {loading ? (
                <div className="mt-5 d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '180px' }}>
                    <Spinner animation="border" role="status" style={{ color: 'lightseagreen' }} />
                    <div className="mt-2" style={{ color: 'lightseagreen' }}>Registering...</div>
                </div>) : (
                <Container className='mt-5 p-3 text-center register-form'>
                    <form onSubmit={onFormSubmit} className='mt-3'>

                        <div>
                            <label className='register-label'>Name : </label>
                            <br />
                            <input className='mt-2 register-input'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            <label className='register-label'>Email : </label>
                            <br />
                            <input className='mt-2 register-input'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label className='register-label'>Password : </label>
                            <br />
                            <input className='mt-2 register-input'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            <label className='register-label'>Role : </label>
                            <br />
                            <input className='mt-2 register-input'
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="Enter your role"
                                required
                            />
                        </div>

                        <div className='text-center mt-4'>
                            <Button className="p-1 register-button" type="submit">Register</Button>
                        </div>

                        {error && <span className='text-center text-danger mt-1'>{error}</span>}

                    </form>
                </Container>)}

        </>
    );
};

export default Register;
