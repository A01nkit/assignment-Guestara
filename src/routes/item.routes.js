import {Router} from "express"
import {
    getallItems,
    createItem,
    getItem,
    getItems,
    deleteItem,
    deleteItems,
    updateItem
} from "../controllers/item.controllers.js"


const router = Router()

router.route("/").get(getallItems)//get all items//
router.route("/createItem/:subcategory").post(createItem)//create item//
router.route("/getItem/:item").get(getItem)//get specific item//
router.route("/getItems/:subcategory").get(getItems)//get item under subcategory//
router.route("/deleteItem/:item").delete(deleteItem)//delete specific item//
router.route("/deleteItems/:subcategory").delete(deleteItems)//delete item under subcategory
router.route("/updateItem/:item").patch(updateItem)//update specific item


export default router;
