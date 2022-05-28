const express = require("express");
const router = express.Router(); //used express to create route handlers
const userController = require("../controllers/userController")
const productController = require("../controllers/productController")
const mid = require("../middleware/authe")


//=============User===========================
router.post("/register", userController.createUser)

router.post("/login", userController.login)

router.get("/user/:userId/profile", mid.authentication, userController.getUser)

router.put("/user/:userId/profile", userController.updateUser)
//=====================Product=========================


router.get("/products", productController.productByQuery)

router.get("/products/:productId", productController.getProduct)

router.post("/products", productController.createProduct)

router.put("/products/:productId", productController.updateProduct)

router.delete("/products/:productId", productController.deleteProduct)




module.exports = router;