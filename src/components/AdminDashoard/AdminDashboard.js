import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminTopBar from '../AdminTopBar/AdminTopBar';
import './AdminDashboard.css';
import axios from 'axios';
import user from '../../Assets/Icons/user.png'
import admin from '../../Assets/Icons/admin.png'
import product from '../../Assets/Icons/product.png'
import pendingProduct from '../../Assets/Icons/pendingProduct.png'

import AOS from 'aos';
import 'aos/dist/aos.css';



const AdminDashboard = () => {

    const [totalCounts, setTotalCounts] = useState([]);
    

    useEffect(() => {
        getTotalCounts();
        AOS.init({
            duration : 2000
          });
    }, [])

    const getTotalCounts = async () => {
        await axios.get("https://kssmartcasestudy.herokuapp.com/api/getCounts")
            .then((response) => {
                console.log(response);
                setTotalCounts(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div >
            <div className="navbar">
                <AdminNavbar />
            </div>
            <div className="admin_dash_page">
                <div data-aos="fade-down" data-aos-delay="300">
                    <AdminTopBar  />
                </div>
                <div className="admin_dash_body">
                    <div className="dashboard_card user_card" data-aos="flip-down" data-aos-delay="300">
                        <div>
                            <p className="count">{totalCounts.vendorCount}</p>
                            <p>New Users</p>
                        </div>
                        <img src={user} alt="img" />
                    </div>
                    <div className="dashboard_card admin_card" data-aos="flip-down" data-aos-delay="300">
                        <div>
                            <p className="count">{totalCounts.adminCount}</p>
                            <p>Admin Counts</p>
                        </div>
                        <img src={admin} alt="img" />
                    </div>
                    <div className="dashboard_card product_card " data-aos="flip-down" data-aos-delay="300">
                        <div>
                            <p className="count">{totalCounts.productsCount}</p>
                            <p>Total Products</p>
                        </div>
                        <img src={product} alt="img" />
                    </div>
                    <div className="dashboard_card pending_card " data-aos="flip-down" data-aos-delay="300">
                        <div>
                            <p className="count">{totalCounts.pendingProductCount}</p>
                            <p>Pending Products</p>
                        </div>
                        <img src={pendingProduct} alt="img" />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AdminDashboard
