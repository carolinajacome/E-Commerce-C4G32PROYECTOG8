const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Product name cannont exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        maxlength: [5, 'Stock cannot exceed 5 characters'],
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        maxlength: [5, 'Product price must be less than 5 characters'],
        default: 0.00
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: [true, 'Image public_id is required']
        },
        url: {
            type: String,
            required: [true, 'Image url is required']
        },
    }],
    category: {
        name: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: ['man', 'woman'],
                message: 'Please select correct category for product'
            }
        },
        subcategory: {
            type: String,
            required: [true, 'Subcategory is required'],
            enum: {
                values: ['tshirt', 'jeans', 'shoes'],
                message: 'Please select correct subcategory for product'
            }
        }
    },
    seller: {
        type: String,
        required: [true, 'Seller is required']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            min: [1, 'Rating must be greater than 1'],
            max: [5, 'Rating must be less than 5']
        },
        comments: {
            type: String,
            required: [true, 'Comments is required']
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);