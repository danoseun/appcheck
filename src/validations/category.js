/* eslint-disable prefer-const */
import dotenv from 'dotenv';
import Validator from 'validatorjs';
import { Category } from '../models';

dotenv.config();


export const categoryValidator = {
  /** This functions validates category data
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
      */
  async validateCategory(req, res, next) {
    let {
      name, description
    } = req.body;

    const rules = {
      name: 'required|string',
      description: 'required|string',
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors
      });
    }
    name = name.toLowerCase().trim();


    let foundCategory;
    try {
      foundCategory = await Category.findOne({ name });
      if (foundCategory) {
        return res.status(409).json({
          status: 409,
          error: `${name} category already exists, consider choosing another name`
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
    req.body.name = name;
    req.body.description = description;
    return next();
  },

  /** This functions checks whether a category with a particular id exists
   * Before passing onto other functions
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
*/
  async getOneCategoryChecker(req, res, next) {
    const { categoryId } = req.params;

    try {
      const category = await Category.findById({ _id: categoryId });
      if (!category) {
        return res.status(404).json({
          status: 404,
          error: 'Category not found'
        });
      }
      req.body.category = category;
      return next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
};
