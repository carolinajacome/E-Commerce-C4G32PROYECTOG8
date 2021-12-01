import { useEffect, useState } from "react"

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/productActions'
import Sidebar from "./Sidebar"
import { NEW_PRODUCT_RESET } from "../../constants/productConstants"


const NewProduct = ({ history }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accesories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoors',
        'Home'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newProduct);

    useEffect(() => {
        if (success) {
            history.push('/admin/products');
            alert.success('Producto creado exitosamente!');
            dispatch({ type: NEW_PRODUCT_RESET })
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);


        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newProduct(formData))
    }

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }


    return (
        <>
            <MetaData title={'Nuevo producto'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Nuevo Producto</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nombre</label>
                                    <input type="text" id="name_field" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Precio</label>
                                    <input type="text" id="price_field" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Descripción</label>
                                    <textarea className="form-control" id="description_field" rows="10" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Categoría</label>
                                    <select id="category_field" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category}> {category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input type="number" id="stock_field" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Nombre del vendedor</label>
                                    <input type="text" id="seller_field" className="form-control" value={seller} onChange={(e) => setSeller(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Imágenes</label>

                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="product_images"
                                            className="custom-file-input"
                                            id="customFile"
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Elegir imágenes
                                        </label>
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >CREAR</button>
                            </form>
                        </div>

                    </>
                </div>
            </div>
        </>
    )
}

export default NewProduct
