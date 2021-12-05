/* import React, { Fragment } from 'react'

const Footer = () => {
    return (
        <Fragment>
            <footer className="py-1">
                <p className="text-center mt-1">
                    Shopping Cart - 2019-2020, All Rights Reserved
                </p>
            </footer>
        </Fragment>
    )
}

export default Footer */


import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import j4jeans from '../../assets/logo.png'

const Footer = () => {
    return (
        <MDBFooter bgColor='primary' className='text-white text-center text-lg-center'>
            <MDBContainer className='p-4'>
                <MDBRow>
                    <MDBCol lg='3' md='12' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>JFOURJEANS</h5>
                        <img src={j4jeans} className="w-100 img-max mb-3" />
                    </MDBCol>

                    <MDBCol lg='3' md='4' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Acerca de</h5>

                        <ul className='list-unstyled mb-0'>
                            <li>
                                <a href='#!' className='text-white'>
                                    Quiénes somos
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                    Política de tratamiento de datos personales
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                    Política de envíos
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                    Términos y condiciones
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                    Seguimiento orden
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                    PQR
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                    Garantía
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                    Contáctanos
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                    Mapa del sitio
                                </a>
                            </li>
                        </ul>
                    </MDBCol>

                    <MDBCol lg='3' md='4' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Atención al cliente</h5>

                        <ul className='list-unstyled mb-0'>
                            <li>
                                <a href='#!' className='text-white'>
                                Llamanos: (+57) 3112666269
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                WhatsApp: (+57) 3223658208
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                Messenger: @JFOURJEANS
                                </a>
                            </li>
                            <li>
                                <a href='#!' className='text-white'>
                                    Instagram: @JFOURJEANS
                                </a>
                            </li>
                        </ul>
                    </MDBCol>
                    <MDBCol lg='3' md='4' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase mb-0'>Síguenos en</h5>

                        <ul className='list-unstyled mb-0 mt-3'>
                            <li>
                                <a target="_blank" href='http://Facebook.com/jfourjeans' className='text-white'>
                                    <i className="fa fa-facebook fa-2x hover-fb"></i>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href='http://Twitter.com/jfourjeans' className='text-white'>
                                    <i className="fa fa-twitter fa-2x mt-2 hover-tw"></i>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href='http://Instagram.com/jfourjeans' className='text-white'>
                                    <i className="fa fa-instagram fa-2x mt-2 hover-ins"></i>
                                </a>
                            </li>

                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                JFOURJEANS &trade; Inc. All rights reserved &copy;  {new Date().getFullYear()}

            </div>
        </MDBFooter>
    );
}

export default Footer


