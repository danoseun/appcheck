/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
import { Category } from '../models';

export const categoryController = {
  /**
     * Create category on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof categoryController object
     */

  async createCategory(req, res) {
    const { name, description } = req.body;
    try {
      const newCategory = await new Category({
        name,
        description
      }).save();
      return res.status(201).json({
        status: 201,
        data: newCategory
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * View all categories on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof categoryController object
     */

  async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      return res.status(200).json({
        status: 200,
        data: categories
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin get single category by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof categoryController object
     */
  async getOneCategory(req, res) {
    const { category } = req.body;
    return res.status(200).json({
      status: 200,
      data: category
    });
  },

  /**
     * Admin update category by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof categoryController object
     */
  async editCategory(req, res) {
    let { category, name, description } = req.body;
    if (!name || !name.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Add the category name'
      });
    }

    if (!description || !description.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Add a short description for the category'
      });
    }
    name = name.toLowerCase();
    const foundCategory = await Category.findOne({ name });

    /**
     * This conditional block checks if the category is found
     * And if the id of the foundcategory is same as the id of the current category.
     * The current category name can also be retained in the event that need be
     */
    if (foundCategory && (foundCategory._id.toString() !== category._id.toString())) {
      return res.status(409).json({
        status: 409,
        error: `${name} already exists, consider choosing another name`
      });
    }
    try {
      category.name = name;
      category.description = description;
      await category.save();
      return res.status(200).json({
        status: 200,
        data: 'Category information successfully updated'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin delete category by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */
  async removeCategory(req, res) {
    const { categoryId } = req.params;
    try {
      const foundCategory = await Category.findByIdAndDelete({ _id: categoryId });
      if (!foundCategory) {
        return res.status(404).json({
          status: 404,
          error: 'Category not found'
        });
      }
      return res.status(200).json({
        status: 200,
        data: 'Category successfully deleted'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
};
