import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import List from './Components/List';
import Edit from './Components/Edit';
import Create from './Components/Create';
import Login from './Components/Login';
import './styles.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="list" element={<List />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="create" element={<Create />} />
        </Route>
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;
