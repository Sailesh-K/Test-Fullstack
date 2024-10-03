import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await axios.get(`http://localhost:3000/employee/${id}`, config);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id, navigate]);

    const initialValues = employee ? {
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        designation: employee.designation,
        gender: employee.gender,
        course: {
            MCA: employee.course.MCA || false,
            BCA: employee.course.BCA || false,
            BSC: employee.course.BSC || false,
        },
    } : {
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: {
            MCA: false,
            BCA: false,
            BSC: false,
        },
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobile: Yup.string().required('Mobile is required'),
        designation: Yup.string().required('Designation is required'),
        gender: Yup.string().required('Gender is required'),
    });

    const handleSubmit = async (values) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('mobile', values.mobile);
        formData.append('designation', values.designation);
        formData.append('gender', values.gender);
        formData.append('course[MCA]', values.course.MCA);
        formData.append('course[BCA]', values.course.BCA);
        formData.append('course[BSC]', values.course.BSC);
        if (image) {
            formData.append('image', image); // Add image file if selected
        }

        try {
            await axios.put(`http://localhost:3000/employee/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/list');
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <h2>Edit Employee</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={values.name} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={values.email} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                        />
                        <input 
                            type="text" 
                            name="mobile" 
                            placeholder="Mobile No." 
                            value={values.mobile} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                        />
                        
                        <select 
                            name="designation" 
                            value={values.designation} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Sales">Sales</option>
                            <option value="Manager">Manager</option>
                        </select>

                        <div>
                            <label>Select Gender:</label>
                            <div>
                                <label>
                                    <Field type="radio" name="gender" value="Male" />
                                    Male
                                </label>
                                <label>
                                    <Field type="radio" name="gender" value="Female" />
                                    Female
                                </label>
                            </div>
                        </div>

                        <div>
                            <label>Select Courses:</label>
                            <div>
                                <label>
                                    <Field type="checkbox" name="course.MCA" />
                                    MCA
                                </label>
                                <label>
                                    <Field type="checkbox" name="course.BCA" />
                                    BCA
                                </label>
                                <label>
                                    <Field type="checkbox" name="course.BSC" />
                                    BSC
                                </label>
                            </div>
                        </div>

                        <div>
                            <label>Image</label>
                            <input
                                type="file"
                                name="image"
                                onChange={(event) => setImage(event.currentTarget.files[0])}
                            />
                        </div>

                        <button type="submit">Update Employee</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Edit;
