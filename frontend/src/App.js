import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import axios from 'axios';
import './App.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {
      fetchRecipes();
    }
  }, [isAuthenticated]);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/recipes');
      setRecipes(res.data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    }
  };

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <Link className="navbar-brand" to="/">🍽 Recipedia</Link>
        <ul className="navbar-nav ms-auto">
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/add-recipe">Add Recipe</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recipes">Recipe List</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? '/recipes' : '/login'} />} />
          <Route path="/register" element={<Register onAuth={handleAuthentication} />} />
          <Route path="/login" element={<Login onAuth={handleAuthentication} />} />
          <Route path="/add-recipe" element={<AddRecipeForm onRecipeAdded={fetchRecipes} />} />
          <Route
            path="/recipes"
            element={<RecipeList recipes={recipes} setRecipes={setRecipes} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
