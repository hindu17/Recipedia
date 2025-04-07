const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new recipe
router.post('/', async (req, res) => {
  const { title, ingredients, instructions } = req.body;

  console.log("✅ POST /recipes hit:", req.body);


  const newRecipe = new Recipe({
    title,
    ingredients,
    instructions
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a recipe
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (Update) a recipe
router.put('/:id', async (req, res) => {
  const { title, ingredients, instructions } = req.body;

  try {
    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions },
      { new: true } // return updated doc
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
