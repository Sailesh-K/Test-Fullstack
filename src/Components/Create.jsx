import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

function Create() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const initialValues = {
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
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
            await axios.post('http://localhost:3000/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/list');
        } catch (error) {
            console.error("Error creating employee:", error);
        }
    };

    return (
        <div className='container'>
            <h2>Create Employee</h2>
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
                            <label>
                                <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
                            </label>
                        </div>

                        <div>
                            <label>Select Courses:</label>
                            <label>
                                <input type="checkbox" name="course.MCA" onChange={handleChange} /> MCA
                            </label>
                            <label>
                                <input type="checkbox" name="course.BCA" onChange={handleChange} /> BCA
                            </label>
                            <label>
                                <input type="checkbox" name="course.BSC" onChange={handleChange} /> BSC
                            </label>
                        </div>

                        <label>Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={(event) => setImage(event.currentTarget.files[0])}
                        />

                        <button type="submit">Create Employee</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Create;
