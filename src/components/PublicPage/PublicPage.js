import React, { useEffect, useState } from 'react';
import './PublicPage.css';
import bg from '../../Assets/Images/bg1.jpg';
import { Link } from 'react-router-dom'
import axios from 'axios';

const PublicPage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getPendingProducts();
    }, [])


    const getPendingProducts = async () => {
        axios.get("http://localhost:8080/api/allProducts")
            .then((response) => {
                console.log(response);
                setProducts(response.data)
            }).catch((err) => {
                console.log(err.response.data.message);
            })
    }
    return (
        <div className="public_page">
            <div>
                <img src={bg} alt="img" />
            </div>
            <div className="public_container">
                <div className="public_topBar">
                    <h1 >KS Smart Solution</h1>
                    <Link className="login_btn" to="login">Login</Link>
                </div>
                <div className="public_body">
                    <h2>Product List</h2>
                    <div className="public_product_card">
                        {
                            products.map((item, i) => {
                                if (item.accept === true) {
                                    return (
                                        <div className="public_products">
                                            <div>
                                                <img src={item.image} alt="image" />
                                            </div>
                                            <div className="product_details">
                                                <p className="feild_name">Name :</p>
                                                <p className="product_name">{item.name}</p>
                                                <p className="feild_name">Description :</p>
                                                <p className="product_desc">{item.description}</p>
                                                <p className="feild_name">Price :</p>
                                                <p className="product_price">{item.price}</p>
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

export default PublicPage
