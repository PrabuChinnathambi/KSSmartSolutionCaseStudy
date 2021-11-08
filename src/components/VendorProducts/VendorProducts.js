import React, { useEffect, useState } from 'react';
import './VendorProducts.css';
import axios from 'axios';


const VendorProducts = () => {

    const [products, setProducts] = useState([]);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const vendor = currentUser.id;



    useEffect(() => {
        getUserProduct();

    }, [])

    const getUserProduct = () => {

        axios.get("https://kssmartcasestudy.herokuapp.com/api/allProducts")
            .then((response) => {
                console.log(response)
                setProducts(response.data)
            }).catch((err) => {
                console.log(err.response.data.message);
            })
    }

    
    console.log(products)
    return (
        <div className="vendor_products_container">

            <p className="vendor_products_heading">Your Products</p>
            <div className="vendore_products_card" >
                {
                    products.map((item, i) => {
                        if (item.vendorId === vendor) {
                            return (
                                <div className="vendore_products" key={i} >
                                    <div>
                                        <img src={item.image} alt="img" />
                                    </div>
                                    <div className="vendor_products_details">
                                        <p className="vendor_products_sub_head">Name</p>
                                        <p>{item.name}</p>
                                        <p className="vendor_products_sub_head">Description</p>
                                        <p>{item.description}</p>
                                        <p className="vendor_products_sub_head">Price</p>
                                        <p>₹ {item.price}</p>
                                    </div>
                                </div>
                            )
                        }

                    })
                }
            </div>
        </div>
    )
}

export default VendorProducts;