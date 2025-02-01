import {Router} from "express"
import {
    getallSubCategories,
    createSubCategory,
    getSubCategory,
    getSubCategories,
    deleteSubCategory,
    deleteSubCategories,
    updateSubCategory
} from "../controllers/subCategory.controllers.js"

const router = Router()

router.route("/").get(getallSubCategories)//get all subcategories//
router.route("/createSubCategory/:category").post(createSubCategory)//create subcategory under category//
router.route("/getSubCategory/:subCategory").get(getSubCategory)//get specific subcategory//
router.route("/getSubCategories/:category").get(getSubCategories)//get subcategory under category//
router.route("/deleteSubCategory/:subCategory").delete(deleteSubCategory)//delete specific subcategory//
router.route("/deleteSubCategories/:category").delete(deleteSubCategories)//delete subcategory under category
router.route("/updateSubCategory/:subCategory").patch(updateSubCategory)//update specific subcategory


//router.route("/updateSubCategories/:Category").patch(updateSubCategory)//update under category

export default router;
