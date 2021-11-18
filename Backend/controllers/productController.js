const Product = require('../models/product')

const ErrorHandler = require ('../utils/errorHandler')

//crear nuevo producto

exports.newProduct= async (req, res, next) => {
    const product= await Product.create(req.body);

    res.status(201).json({

        succes:true,
        product

    })  
}

//Obtener todos los productos --> /api/v1/products
exports.getProducts =async (req,res, next) => {
    const products= await Product.find()  ;

    res.status(200).json({
        succes:true,
        count: products.length,
        products
       // message: 'Ruta que muestra todos los productos en la base de datos'
    })
 

}

//Obtener detalles de un solo producto => /api/v1/product/:id
 
exports.getSingleProduct= async (req, res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
       /* return res.status(404).json({

            success:false,
            message: 'El producto no fue encontrado'
        })
    }    
    */
    return next (new ErrorHandler ('El producto no ha sido encontrado',404));
}
   
    res.status(200).json({
        succes:true,
        product  
    })
}

//udpate product -> /api/v1/admin/product/:id
exports.updateProduct = async (req,res, next) =>  {

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message: 'El producto no fue encontrado'
        })
    }
    product= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false 
    });
    res.status(200).json({
        succes:true,
        product
    })
}
//delete Product => /api/v1/admin/product/:d
exports.deleteProduct= async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({

            success:false,
            message: 'El producto no fue encontrado'
        })
    }   
    await product.remove();
    res.status(200).json({
        succes:true,
        message: 'El producto fue eliminado'
    })
}  