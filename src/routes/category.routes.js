import {Router} from "express"
import { 
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory,
    getCategories
} from "../controllers/category.controllers.js"

const router = Router()

router.route("/createCategory").post(createCategory)
router.route("/getCategories").get(getCategories)
router.route("/getCategory/:category").get(getCategory)
//router.route("/deleteCategory/:category").delete(deleteCategory)
router.route("/updateCategory/:category").patch(updateCategory)
 
export default router;