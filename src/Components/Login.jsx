import React from 'react';
import { FormikProvider } from './FormikProvider';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';

function Login() {
    const navigate = useNavigate();

    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("http://localhost:3000/login", {
                username: values.username,
                password: values.password,
            });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', values.username);
                navigate('/');
            } else {
                console.log("Login failed!");
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className='container'>
            <h3>Login</h3>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>{touched.username && errors.username ? errors.username : null}</div>
                        </div>

                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>{touched.password && errors.password ? errors.password : null}</div>
                        </div>

                        <button type="submit">Login</button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
