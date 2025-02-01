import  {SubCategory}  from "../models/subCategory.model.js";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const getallSubCategories = asyncHandler(async (req, res, next) => {
    const subCategory = await SubCategory.find();
    
    if (!subCategory.length) {
        throw new ApiError(404, `SubCategory not found`);
    }
    ApiResponse.send(res, `SubCategory fetched successfully`, 200, subCategory);
});

export const createSubCategory = asyncHandler(async (req, res, next) => {
    //get user detail from frontend(form, json, url) if coming from form or json we can extract it from req.body
    const {category} = req.params;
    const { name, description, imageUrl, taxApplicability, tax, taxType } = req.body;
    //validation - not empty
    if (!name || !description) {
        throw new ApiError(400, `Name and Description required`);
    }

    //check if category exist: name
    const categoryExist = await Category.findOne({ name: category.toLowerCase()});
    if (!categoryExist) {
        throw new ApiError(400, `Category ${category} do not exist. Please create category first`);
    }

    //check if subCategory already exist: name
    const subCategoryExist = await SubCategory.findOne({ name });
    if (subCategoryExist) {
        throw new ApiError(400, `subCategory ${name} already exist`);
    }

    //create subCategory
    const subCategory = await SubCategory.create({
        name: name,
        description,
        image_url: imageUrl,
        taxApplicability: taxApplicability || false,
        tax: tax || 0,
        taxType: taxType || "GST",
        categoryId: categoryExist.name
    });

    if (!subCategory) {
        throw new ApiError(500, `SubCategory not created`);
    }

    //send response
    ApiResponse.send(res, `SubCategory created successfully`, 201, subCategory);

});

export const getSubCategory = asyncHandler(async (req, res, next) => {
    const { subCategory } = req.params;
    const subCategoryData = await SubCategory.findOne({ name: subCategory.toLowerCase() });
    if (!subCategoryData) {
        throw new ApiError(404, `SubCategory ${subCategory} not found`);
    }   

    ApiResponse.send(res, `SubCategory fetched successfully`, 200, subCategoryData);
});

export const getSubCategories = asyncHandler(async (req, res, next) => {
    const { category } = req.params;
    const subCategoryData = await SubCategory.find({ categoryId: category.toLowerCase() });
    
    if (!subCategoryData.length) {
        throw new ApiError(404, `SubCategory not found`);
    }
    ApiResponse.send(res, `SubCategory fetched successfully`, 200, subCategoryData);
});

export const deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { subCategory } = req.params;
    //find, subCategory exist or not
    const subCategoryExist = await SubCategory.findOne({ name: subCategory.toLowerCase() });
    if (!subCategoryExist) {
        throw new ApiError(404, `SubCategory ${subCategory} not found`);
    }

    //delete subCategory
    await SubCategory.deleteOne({ name: subCategory.toLowerCase() });
    ApiResponse.send(res, `SubCategory deleted successfully`, 200);
});

export const deleteSubCategories = asyncHandler(async (req, res, next) => {
    const { category } = req.params;
    //find, subCategory exist or not
    const subCategoryExist = await SubCategory.find({ categoryId: category.toLowerCase() });
    if (!subCategoryExist.length) {
        throw new ApiError(404, `SubCategory not found. Please create subCategory first`);
    }

    //delete subCategory
    await SubCategory.deleteMany({ categoryId: category });
    ApiResponse.send(res, `SubCategory deleted successfully`, 200);
});

export const updateSubCategory = asyncHandler(async (req, res, next) => {
    //get user detail from frontend(form, json, url) if coming from form or json we can extract it from req.body
    const { subCategory } = req.params;
    const { name, description, imageUrl, taxApplicability, tax, taxType, categoryId } = req.body;

    //Check if subCategory exist
    const subCategoryExist = await SubCategory.findOne({ name: subCategory.toLowerCase() });
    if (!subCategoryExist) {//if null
        throw new ApiError(404, `SubCategory ${subCategory} not found`);
    }

    //exist, update 
    subCategoryExist.name = name || subCategoryExist.name;
    subCategoryExist.description = description || subCategoryExist.description;
    subCategoryExist.image_url = imageUrl || subCategoryExist.image_url;
    subCategoryExist.taxApplicability = taxApplicability || subCategoryExist.taxApplicability;
    subCategoryExist.tax = tax || subCategoryExist.tax;
    subCategoryExist.taxType = taxType || subCategoryExist.taxType;
    subCategoryExist.categoryId = categoryId || subCategoryExist.categoryId;

    //save
    await subCategoryExist.save();
    ApiResponse.send(res, `SubCategory updated successfully`, 200, subCategoryExist);

});