import React, { useEffect } from 'react';
import './VendorNavbar.css';
import { Link } from 'react-router-dom';
import topBarProfile from '../../Assets/Icons/topBarProfile.png';

const VendorNavbar = () => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // console.log(currentUser);

    const handleLogOut = () => {
        localStorage.setItem('currentUser', "");
        localStorage.setItem('token', "");
    }

    return (
        <div className="nav_container">
            <div className="navbar_left">
                <img src={topBarProfile} alt="img" />
            </div>
            <div className="navbar_right">
                <p className="welcome_name" >Welcome {currentUser.name}...!</p>
                <div className="navbar_card">
                    <div className="navbar_values">
                        <p>Name :</p>
                        <p>{currentUser.name}</p>
                    </div>
                    <div>
                        <p>Email ID :</p>
                        <p>{currentUser.email}</p>
                    </div>
                    <div>
                        <p>District :</p>
                        <p>{currentUser.district}</p>
                    </div>
                    <div>
                        <Link to="/" onClick={handleLogOut} className="navbar_card_btn">Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorNavbar
