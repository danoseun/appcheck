/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import dotenv from 'dotenv';
import Validator from 'validatorjs';
import { Category, Recipe } from '../models';

dotenv.config();


export const recipeValidator = {
  /** This functions validates category data
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
      */
  async validateRecipe(req, res, next) {
    let {
      name, price
    } = req.body;

    const { categoryId } = req.params;

    const rules = {
      name: 'required|string',
      price: 'required|integer'
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors
      });
    }
    /**
     * Check if category the recipe is about to be added to
     * already exists in the category table
     */
    // category = category.toLowerCase().trim();
    let foundCategory;
    try {
      foundCategory = await Category.findById({ _id: categoryId });
      if (!foundCategory) {
        return res.status(400).json({
          status: 400,
          error: 'Recipes can only be added to an existing category'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }

    name = name.toLowerCase().trim();


    let foundRecipe;
    try {
      foundRecipe = await Recipe.findOne({ name });
      if (foundRecipe) {
        return res.status(409).json({
          status: 409,
          error: `${name} recipe already exists, consider choosing another name`
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }

    req.body.name = name;
    req.body.category = foundCategory.name;
    req.body.price = price;
    return next();
  },

  /** This functions checks whether a category with a particular id exists
   * Before passing onto other functions
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
*/
  async getOneRecipeChecker(req, res, next) {
    const { recipeId, categoryId } = req.params;

    // Check if category exists by id
    try {
      const category = await Category.findById({ _id: categoryId });
      if (!category) {
        return res.status(404).json({
          status: 404,
          error: 'category does not exist'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }

    // Check if recipe exists by id
    try {
      const recipe = await Recipe.findById({ _id: recipeId });
      if (!recipe) {
        return res.status(404).json({
          status: 404,
          error: 'Recipe not found'
        });
      }
      req.body.recipe = recipe;
      return next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
};
