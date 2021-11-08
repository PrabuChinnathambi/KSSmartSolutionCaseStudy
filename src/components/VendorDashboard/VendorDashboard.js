import React from 'react';
import VendorAddProduct from '../VendorAddProduct/VendorAddProduct';
import VendorNavbar from '../VendorNavbar/VendorNavbar';
import VendorProducts from '../VendorProducts/VendorProducts';
import './VendorDashboard.css';

const VendorDashboard = () => {
    return (
        <div className="vendor_page">
            <div className="vendor_navbar">
                <VendorNavbar />
            </div>
            <div className="vendor_body">
                <div>
                    <VendorAddProduct />
                </div>
                <div>
                    <VendorProducts/>
                </div>
            </div>
        </div>
    )
}

export default VendorDashboard
