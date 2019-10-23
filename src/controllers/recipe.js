/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
import { Category, Recipe } from '../models';

export const recipeController = {
  /**
     * Create a recipe on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof recipeController object
     */

  async createRecipe(req, res) {
    const { name, category, price } = req.body;
    try {
      const newRecipe = await new Recipe({
        name,
        category,
        price
      }).save();
      return res.status(201).json({
        status: 201,
        data: newRecipe
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * View all recipes on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof recipeController object
     */

  async getAllRecipes(req, res) {
    try {
      const recipes = await Recipe.find();
      return res.status(200).json({
        status: 200,
        data: recipes
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin get single recipe by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof recipeController object
     */
  async getOneRecipe(req, res) {
    const { recipe } = req.body;
    return res.status(200).json({
      status: 200,
      data: recipe
    });
  },

  /**
     * Admin update recipe by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof recipeController object
     */
  async editRecipe(req, res) {
    let { recipe, name, price } = req.body;
    if (!name || !name.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Add the recipe name'
      });
    }

    if (!price || !price.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Add a price for the recipe'
      });
    }

    if (isNaN(price)) {
      return res.status(400).json({
        status: 400,
        error: 'Price should be a number'
      });
    }
    name = name.toLowerCase();
    const foundRecipe = await Recipe.findOne({ name });

    /**
     * This conditional block checks if the recipe is found
     * And if the id of the foundrecipe is same as the id of the current recipe.
     * The current recipe name can also be retained in the event that need be
     */
    if (foundRecipe && (foundRecipe._id.toString() !== recipe._id.toString())) {
      return res.status(409).json({
        status: 409,
        error: `${name} already exists, consider choosing another name`
      });
    }
    try {
      recipe.name = name;
      recipe.price = price;
      await recipe.save();
      return res.status(200).json({
        status: 200,
        data: 'Recipe information successfully updated'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin delete recipe by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof recipeController object
     */
  async removeRecipe(req, res) {
    const { categoryId, recipeId } = req.params;
    try {
      const foundCategory = await Category.findById({ _id: categoryId });
      if (!foundCategory) {
        return res.status(404).json({
          status: 404,
          error: 'Category does not exist'
        });
      }
      const foundRecipe = await Recipe.findByIdAndDelete({ _id: recipeId });
      if (!foundRecipe) {
        return res.status(404).json({
          status: 404,
          error: 'Recipe not found'
        });
      }
      return res.status(200).json({
        status: 200,
        data: 'Recipe successfully deleted'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
};
