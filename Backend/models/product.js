const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Ingrese el nombre del producto'],
        trim: true,
        maxlength: [100, 'El nombre del producto no puede ser superior a 100 carácteres']
    },

    price: {
        type: Number,
        required: [true, 'Ingrese el precio del producto'],
        maxlength: [6, 'Precio'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Ingrese la descripción del producto'],

    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id:
            {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Selecciona la categoría de este producto'],
        enum:
        {
            values:[
                'Dama',
                'Caballero',
                'Jeans',
                'Bermudas',
                'Camisas'
            ],
            message: 'Por favor selecciona la categoria correcta del producto'
        }
    },
    seller:
    {
        type: String,
        required:[true, 'Ingresa la marca del producto']
    },
    stock:{
        type:Number,
        required:[true,'Ingresa el número de productos disponibles'],
        maxLength:[5, 'El número máximo no puede ser superior a 5 digitos'],
        default:0
    },

    numOfReviews:{
        type: Number,
        default:0
    },
    reviews:
    [
        {
            name:
            {
                type:String,
                required: true
            },
            rating:{
                type:Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
          type: Date,
          default: Date.now
    }

})
module.exports = mongoose.model('Product', productSchema);