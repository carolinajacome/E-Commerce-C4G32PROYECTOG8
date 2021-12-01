const express = require("express");
const router = express.Router();
const {
    findAllProducts,
    findProductById,
    findProductByName,
    findProductByCategory,
    createProduct,
    updateProduct,
    deleteProductById,
    deleteAllProducts,
    createProductReview,
    getProductReviews,
    deleteReview,
    findAllProductsAdmin
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route("/products").get(findAllProducts);
router.route("/admin/products").get(findAllProductsAdmin);
router.route("/product/:id").get(findProductById);
router.route("/product/name/:name").get(findProductByName);
router.route("/products/category/:category").get(findProductByCategory);

router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProductById);
router.route("/admin/products").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAllProducts);

module.exports = router;