import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <header style={styles.header}>
            <nav style={styles.nav}>
                <ul style={styles.ul}>
                    <li style={styles.li}>
                        <Link to="/list" style={styles.link}>Employee List</Link>
                    </li>
                    <li style={styles.li}>
                        <Link to="/create" style={styles.link}>Add new employee</Link>
                    </li>
                    <li style={styles.li}>
                        {username ? <span style={styles.username}>Welcome, {username}</span> : <span>Please log in</span>}
                    </li>
                    <li style={styles.li}>
                        <a onClick={handleLogout} style={styles.link} href="#">Logout</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

const styles = {
    header: {
        backgroundColor: '#333',
        padding: '10px 60px',
        color: 'white',
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        gap: '20px',
    },
    li: {
        display: 'inline',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    username: {
        color: 'lightgreen',
    },
};

export default Header;
