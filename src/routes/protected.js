import express from 'express';
// import passport from '../config/passport';
import { passportJWTCheck, verifyAdmin } from '../middleware/auth';
import { recipeValidator, categoryValidator } from '../validations';
import { recipeController, categoryController } from '../controllers';

const { validateCategory, getOneCategoryChecker } = categoryValidator;
const { validateRecipe, getOneRecipeChecker } = recipeValidator;

const {
  createCategory, getAllCategories, getOneCategory, editCategory, removeCategory
} = categoryController;

const {
  createRecipe, getAllRecipes, getOneRecipe, editRecipe, removeRecipe
} = recipeController;


export const protectedRouter = express.Router();

// Category routes
protectedRouter.post('/categories', passportJWTCheck, verifyAdmin, validateCategory, createCategory);
protectedRouter.get('/categories', passportJWTCheck, getAllCategories);
protectedRouter.get('/categories/:categoryId', passportJWTCheck, verifyAdmin, getOneCategoryChecker, getOneCategory);
protectedRouter.put('/categories/:categoryId', passportJWTCheck, verifyAdmin, getOneCategoryChecker, editCategory);
protectedRouter.delete('/categories/:categoryId', passportJWTCheck, verifyAdmin, removeCategory);

// Recipe Routes
protectedRouter.post('/categories/:categoryId/recipes', passportJWTCheck, verifyAdmin, validateRecipe, createRecipe);
protectedRouter.get('/categories/:categoryId/recipes', passportJWTCheck, getAllRecipes);
protectedRouter.get('/categories/:categoryId/recipes/:recipeId', passportJWTCheck, verifyAdmin, getOneRecipeChecker, getOneRecipe);
protectedRouter.put('/categories/:categoryId/recipes/:recipeId', passportJWTCheck, verifyAdmin, getOneRecipeChecker, editRecipe);
protectedRouter.delete('/categories/:categoryId/recipes/:recipeId', passportJWTCheck, verifyAdmin, removeRecipe);

// yet to do
// generate unique links for recipe
// add to cart
// robust search