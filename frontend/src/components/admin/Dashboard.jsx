import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import Sidebar from './sidebar'

import { getAdminProducts, clearErrors } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
    }, [dispatch])


    return (
        <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>
                    <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card text-white bg-primary o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Cantidad total <br /><b>$4567</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row pr-4">
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Productos <br /><b>{products && products.length}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                <span className="float-left">Ver Detalles</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-danger o-hidden h-100">
                        <div className="card-body">
                            <div className="text-center card-font-size">Ordenes <br /><b>125</b></div>
                        </div>
                        <Link to="/admin/orders" className="card-footer text-white clearfix small z-1">
                            <span className="float-left">Ver detalles</span>
                            <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-info o-hidden h-100">
                        <div className="card-body">
                            <div className="text-center card-font-size">Usuarios <br /><b>45</b></div>
                        </div>
                        <Link to="/admin/users" className="card-footer text-white clearfix small z-1">
                            <span className="float-left">Ver detalles</span>
                            <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>


                <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-warning o-hidden h-100">
                        <div className="card-body">
                            <div className="text-center card-font-size">Agotado <br /><b>{outOfStock}</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
