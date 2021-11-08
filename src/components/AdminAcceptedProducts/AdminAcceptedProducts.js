import React, { useState, useEffect } from 'react';
import './AdminAcceptedProducts.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminTopBar from '../AdminTopBar/AdminTopBar';
import axios from 'axios';
import AOS from 'aos';

const AdminAcceptedProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getPendingProducts();
        AOS.init({
            duration : 1000
          });
    }, [])


    const getPendingProducts = async () => {
        axios.get("https://kssmartcasestudy.herokuapp.com/api/allProducts")
            .then((response) => {
                console.log(response);
                setProducts(response.data)
            }).catch((err) => {
                console.log(err.response.data.message);
            })
    }
    return (
        <div>
            <div className="navbar">
                <AdminNavbar />
            </div>
            <div className="admin_accepted_body">
                <div data-aos="fade-down" data-aos-delay="100">
                    <AdminTopBar />
                </div>
                <div className="admin_accepted_container">
                    <h2>Accepted Products :</h2>
                    <div className="admin_accepted_main">
                        {
                            products.map((item, i) => {
                                if (item.accept === true) {
                                    return (
                                        <div className="admin_acp_card" data-aos="flip-up">
                                            <div>
                                                <img src={item.image} alt="image" />
                                            </div>
                                            <div>
                                                <p className="feild_names">Name </p>
                                                <p>{item.name}</p>
                                                <p className="feild_names">Description</p>
                                                <p>{item.description}</p>
                                                <p className="feild_names">Price</p>
                                                <p>{item.price}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAcceptedProducts
