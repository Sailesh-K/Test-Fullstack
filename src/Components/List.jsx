import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function List() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await axios.get('http://localhost:3000/list', config);
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id) => {        
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`http://localhost:3000/employee/${id}`, config);
            setEmployees(employees.filter(employee => employee._id !== id));
            alert("Employee deleted successfully."); 
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert("Error deleting employee."); 
        }
    };

    const renderCourse = (course) => {
        const courses = Object.keys(course).filter(key => course[key]);
        return courses.length > 0 ? courses.join(', ') : 'None';
    };


    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container'>
            <h2>Employee List</h2>

            <input 
                type="text" 
                placeholder="Search by name" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{ marginBottom: '20px' }} 
            />

            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee._id}>
                            <td>
                                {employee.imageUrl && (
                                    <img src={employee.imageUrl} alt="Employee Image" />
                                )}
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{renderCourse(employee.course)}</td>
                            <td>
                                <button onClick={() => handleEdit(employee._id)}>Edit</button>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;
