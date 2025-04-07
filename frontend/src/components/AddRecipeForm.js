import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddRecipeForm = ({ setRecipes, editingRecipe, cancelEdit }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (editingRecipe) {
      setTitle(editingRecipe.title);
      setIngredients(editingRecipe.ingredients.join(', '));
      setInstructions(editingRecipe.instructions);
    } else {
      setTitle('');
      setIngredients('');
      setInstructions('');
    }
  }, [editingRecipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      ingredients: ingredients.split(',').map((i) => i.trim()),
      instructions,
    };

    try {
      if (editingRecipe) {
        const res = await axios.put(`http://localhost:5000/recipes/${editingRecipe._id}`, recipeData);
        setRecipes((prev) =>
          prev.map((r) => (r._id === editingRecipe._id ? res.data : r))
        );
        cancelEdit();
      } else {
        const res = await axios.post('http://localhost:5000/recipes', recipeData);
        setRecipes((prev) => [...prev, res.data]);
      }
      setTitle('');
      setIngredients('');
      setInstructions('');
    } catch (err) {
      console.error('Error submitting recipe:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>{editingRecipe ? '✏️ Edit Recipe' : '➕ Add New Recipe'}</h4>
      <div className="mb-3">
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" required />
      </div>
      <div className="mb-3">
        <textarea className="form-control" value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" required />
      </div>
      <button type="submit" className="btn btn-success">{editingRecipe ? 'Update' : 'Add'}</button>
      {editingRecipe && (
        <button type="button" className="btn btn-secondary ms-2" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddRecipeForm;
