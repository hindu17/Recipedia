import React, { useState } from 'react';
import axios from 'axios';

const RecipeList = ({ recipes, setRecipes }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      setRecipes(prev => prev.filter(recipe => recipe._id !== id));
    } catch (err) {
      console.error('Error deleting recipe:', err);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h4 className="mb-3">📜 Recipes</h4>

      <input
        type="text"
        placeholder="Search recipes..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredRecipes.length === 0 ? (
        <p className="text-muted">No recipes match your search.</p>
      ) : (
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div className="col-md-6 mb-4" key={recipe._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                  <p><strong>Instructions:</strong> {recipe.instructions}</p>
                  <button className="btn btn-danger me-2" onClick={() => handleDelete(recipe._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
