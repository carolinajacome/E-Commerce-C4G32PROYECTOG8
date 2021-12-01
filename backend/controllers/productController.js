// Language: javascript
// Path: backend\controllers\productController.js
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary')


/**
 * Lista todos los Produtos
 * path: /api/v1/products
 * method: GET
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findAllProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 8;
    const productsCount = await Product.countDocuments();

    // 1) Filtrar los productos
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().sort().limitFields().paginate(resPerPage);

    // 2) Obtener los productos
    const products = await apiFeatures.query;

    // 3) Enviar los productos
    res.status(200).json({
        success: true,
        message: 'Get products',
        productsCount,
        resPerPage,
        products
    });
});

/**
 * Lista todos los Productos (Admin)
 * path: /api/v1/admin/products
 * method: GET
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

exports.findAllProductsAdmin = catchAsyncErrors(async (req, res, next) => {

    // 2) Obtener los productos
    const products = await Product.find();

    // 3) Enviar los productos
    res.status(200).json({
        success: true,
        products
    });
});


/**
 * Busca Producto por Id
 * path: /api/v1/products/:id
 * method: GET
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findProductById = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    } else {
        res.status(200).json({
            success: true,
            message: 'Product found successfully',
            product
        });
    }
});


/**
 * Crea un Nuevo Producto
 * path: /api/v1/products
 * method: POST
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    let images = []

    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images: req.body.images
    }
    let imagesLinks = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });
        imagesLinks.push({
            public_id: result.public._id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product
    });
});


/**
 * Actualiza un Producto por Id
 * path: /api/v1/products/:id
 * method: PUT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    } else {

        let images = []

        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images: req.body.images
        }
        if (images !== undefined) {
            //Deleting images associated with the product
            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }
            let imagesLinks = []

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: 'products'
                });
                imagesLinks.push({
                    public_id: result.public._id,
                    url: result.secure_url
                })
            }
            req.body.images = imagesLinks
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    }
});

/**
 * Elimina un Producto por Id
 * path: /api/v1/products/:id
 * method: DELETE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.deleteProductById = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    } else {
        //Deleting images associated with the product
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);

        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            product
        });
    }


});


/**
 * Elimina Todos los Productos
 * path: /api/v1/products
 * method: DELETE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteAllProducts = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.deleteMany({});
    res.status(200).json({
        success: true,
        message: 'All products deleted successfully',
        data: product
    });
});

/**
 * Lista un Producto por Nombre
 * path: /api/v1/products/:name
 * method: GET
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.findProductByName = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.find({
        name: req.params.name
    });
    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    } else {
        res.status(200).json({
            success: true,
            message: 'Product found successfully',
            product
        });
    }
});

/**
 * Lista los Productos por categoria
 * path: /api/v1/products/category/:category
 * method: GET
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findProductByCategory = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find({
        "category.name": req.params.category
    });
    res.status(200).json({
        success: true,
        message: 'Product found successfully',
        count: products.length,
        data: products
    });
});


/**
 * Lista los Productos por una lista de categorias
 * path: /products/category/list
 * method: post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findAllProductByCategory = catchAsyncErrors(async (req, res, next) => {

    const categories = [req.params.category.split(',')];
    const products = await Product.find({
        "category.name": {
            $in: categories
        }
    });
    res.status(200).json({
        success: true,
        message: 'Product found successfully',
        count: products.length,
        data: products
    });
});


// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const {
        rating,
        comment,
        productId
    } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true
    })

})


// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})


// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})