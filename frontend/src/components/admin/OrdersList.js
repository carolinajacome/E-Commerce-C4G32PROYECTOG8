import { useEffect } from "react"
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, clearErrors } from '../../actions/orderActions'
import Sidebar from "./Sidebar"
import { DELETE_PRODUCT_RESET } from "../../constants/orderConstants"

const OrdersList= ()=>{

    return(
        <div>

        </div>
    )
}