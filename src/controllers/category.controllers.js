import {Category} from '../models/category.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const createCategory = asyncHandler( async (req, res, next) => {
    //get user detail from frontend(form, json, url) if coming from form or json we can extract it from req.body
    const { name, description, imageUrl, taxApplicability, tax, taxType } = req.body;
    //validation - not empty
    if (!name || !description) {
        throw new ApiError(400, `Name and Description required`);
    }
    //check if category already exist: name
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
        throw new ApiError(400, `Category already exist`);
    }

    //create category
    const category = await Category.create({
        name: name,
        description,
        image_url: imageUrl,
        taxApplicability: taxApplicability || false,
        tax: tax || 0,
        taxType: taxType || "GST"
    });

    if (!category) {
        throw new ApiError(500, `Category not created`);
    }

    //send response
    ApiResponse.send(res, `Category created successfully`, 201, category);  
});

export const getCategory = asyncHandler( async (req, res, next) => {
    const category = await Category.find();
    if (!category) {
        throw new ApiError(404, `Category not found`);
    }
    ApiResponse.send(res, `Category fetched successfully`, 200, category);
});

export const deleteCategory = asyncHandler( async (req, res, next) => {
    const { category } = req.params;
   
    //find, category exist or not
    const categoryExist = await Category.find({name: category.toLowerCase()});
    
    if (!categoryExist.length) {
        throw new ApiError(404, `${category} Category not found`);
    }

    //delete category
    await Category.deleteOne({ name: category.toLowerCase() });
    ApiResponse.send(res, `Category deleted successfully`, 200);
});

export const updateCategory = asyncHandler( async (req, res, next) => {
    //get user detail from frontend(form, json, url) if coming from form or json we can extract it from req.body
    const { category } = req.params;
    const { name, description, imageUrl, taxApplicability, tax, taxType } = req.body;
    
    //Check if category exist
    const categoryExist = await Category.findOne({name: category.toLowerCase()});
    if (!categoryExist) {//if null
        throw new ApiError(404, `${category} Category not found`);
    }

    //exist, update
    categoryExist.name = name || categoryExist.name;
    categoryExist.description = description || categoryExist.description;
    categoryExist.image_url = imageUrl || categoryExist.image_url;
    categoryExist.taxApplicability = taxApplicability || categoryExist.taxApplicability;
    categoryExist.tax = tax || categoryExist.tax;
    categoryExist.taxType = taxType?.toUpperCase() || categoryExist.taxType;
    

    //save to db
    const result = await categoryExist.save();
    if (!result) {
        throw new ApiError(500, `Category not updated`);
    }

    //send response
    ApiResponse.send(res, `Category updated successfully`, 200, result);
});

