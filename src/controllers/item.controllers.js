import { Item } from "../models/item.model.js";
import { SubCategory } from "../models/subCategory.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const getallItems = asyncHandler(async (req, res, next) => {
    const items = await Item.find();
    if (!items.length) {
        throw new ApiError(404, `Items not found`);
    }
    ApiResponse.send(res, `Items fetched successfully`, 200, items);
});

export const createItem = asyncHandler(async (req, res, next) => {
    const { subcategory } = req.params;
    const { name, description, imageUrl, taxApplicability, tax, baseAmount, discount} = req.body;
    
    //validation - not empty
    if (!name || !description || !baseAmount || !discount.toString()) {
        throw new ApiError(400, `Name, Description, Base and Amount required`);
    }
    //check if item already exist: name
    const itemExist = await Item.findOne({ name });
    if (itemExist) {
        throw new ApiError(400, `Item already exist`);
    }

    //create item
    const item = await Item.create({
        name: name,
        description,
        image_url: imageUrl,
        tax_applicability: taxApplicability || false,
        tax: tax || 0,
        base_amount: baseAmount,
        discount,
        total_amount: baseAmount - discount,
        SubCategoryId: subcategory
    });

    if (!item) {
        throw new ApiError(500, `Item not created`);
    }

    //send response
    ApiResponse.send(res, `Item created successfully`, 201, item);
});

export const getItem = asyncHandler(async (req, res, next) => {
    const { item } = req.params;
    const itemData = await Item.findOne({ name: item.toLowerCase() });
    if (!itemData) {
        throw new ApiError(404, `Item ${item} not found`);
    }

    ApiResponse.send(res, `Item fetched successfully`, 200, itemData);
});

export const getItems = asyncHandler(async (req, res, next) => {
    const { subcategory } = req.params;
    const itemData = await Item.find({ SubCategoryId: subcategory.toLowerCase() });

    if (!itemData.length) {
        throw new ApiError(404, `Items not found`);
    }
    ApiResponse.send(res, `Items fetched successfully`, 200, itemData);
});     

export const deleteItem = asyncHandler(async (req, res, next) => {
    const { item } = req.params;
    //find, item exist or not
    const itemExist = await Item.find({ name: item.toLowerCase() });

    if (!itemExist.length) {
        throw new ApiError(404, `${item} Item not found`);
    }

    //delete item
    await Item.deleteOne({ name: item.toLowerCase() });
    ApiResponse.send(res, `Item deleted successfully`, 200);
});

export const deleteItems = asyncHandler(async (req, res, next) => {
    const { subcategory } = req.params;
    //find, item exist or not
    const itemExist = await Item.find({ SubCategoryId: subcategory.toLowerCase() });

    if (!itemExist.length) {
        throw new ApiError(404, `Items not found`);
    }

    //delete item
    await Item.deleteMany({ SubCategoryId: subcategory.toLowerCase() });
    ApiResponse.send(res, `Items deleted successfully`, 200);
});

export const updateItem = asyncHandler(async (req, res, next) => {
    //get user detail from frontend(form, json, url) if coming from form or json we can extract it from req.body
    const { item } = req.params;
    const { name, description, imageUrl, taxApplicability, tax, baseAmount, discount, totalAmount, subCategory } = req.body;

    //Check if item exist
    const itemExist = await Item.findOne({ name: item.toLowerCase() });
    if (!itemExist) {//if null
        throw new ApiError(404, `${item} Item not found`);
    }

    //update item
    itemExist.name = name || itemExist.name;
    itemExist.description = description || itemExist.description;
    itemExist.image_url = imageUrl || itemExist.image_url;
    itemExist.tax_applicability = taxApplicability || itemExist.tax_applicability;
    itemExist.tax = tax || itemExist.tax;
    itemExist.base_amount = baseAmount || itemExist.base_amount;
    itemExist.discount = discount || itemExist.discount;
    itemExist.total_amount = itemExist.base_amount - itemExist.discount;
    itemExist.SubCategoryId = subCategory || itemExist.SubCategoryId;

    const itemData = await itemExist.save();
    if (!itemData) {
        throw new ApiError(500, `Item not updated`);
    }
    console.log(itemData);

    //send response
    ApiResponse.send(res, `Item updated successfully`, 200, itemData);
});