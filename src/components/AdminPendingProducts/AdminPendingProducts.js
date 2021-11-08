import React, { useEffect, useState } from 'react';
import './AdminPendingProducts.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminTopBar from '../AdminTopBar/AdminTopBar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AOS from 'aos';

const AdminPendingProducts = () => {

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

    const handleAccept = (id) => {
        console.log(id);

        const payload = {
            productId: id
        }
        axios.put("https://kssmartcasestudy.herokuapp.com/api/setadminAccept", payload)
            .then((response) => {
                console.log(response);
                getPendingProducts();
                toast("Product Accepted Successfully...!")
            }).catch((err) => {
                console.log(err.response.data.message);
            })

    }

    const handleReject = (id) => {
        const payload = {
            productId: id
        }
        axios.post("https://kssmartcasestudy.herokuapp.com/api/rejectProduct", payload)
            .then((response) => {
                console.log(response);
                getPendingProducts();
                toast("Product Rejected Successfully...!")
            }).catch((err) => {
                console.log(err.response.data.message);
            })
    }



    return (
        <div>
            <div className="navbar">
                <AdminNavbar />
            </div>
            <div className="admin_pending_body">
                <ToastContainer
                    position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div data-aos="fade-down" data-aos-delay="100">
                    <AdminTopBar />
                </div>
                <div className="admin_pending_products_container">
                    <table className="styled-table" data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000">
                        <thead className="table_head">
                            <tr>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Accept/Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((data, i) => {
                                    if (data.accept === false) {
                                        return (
                                            <tr key={i} className="product_card">
                                                <td ><img src={data.image} alt='editIcon' /></td>
                                                <td>{data.name}</td>
                                                <td>{data.description}</td>
                                                <td>{data.price}</td>
                                                <td><button onClick={() => handleAccept(data._id)} className="accpet_btn">Accept</button><button onClick={() => handleReject(data._id)} className="reject_btn">Reject</button></td>
                                            </tr>
                                        )
                                    }

                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminPendingProducts
