import React from 'react';
import topBarProfile from '../../Assets/Icons/topBarProfile.png';
import './AdminTopBar.css';
import { Link } from 'react-router-dom';

const AdminTopBar = () => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const handleLogOut = () => {
        localStorage.setItem('currentUser', "");
        localStorage.setItem('token', "");
    }

    return (
        <div className="topbar">
            <div className="topbar_container">
                <div className="topbar_left">
                    <img src={topBarProfile} alt="profile" />
                    <div>
                        <p>Welcome!</p>
                        <p>{currentUser.name}</p>
                    </div>
                </div>
                <div className="topbar_right">
                    <Link to="/" type="submin" className="logOut_btn" onClick={handleLogOut} >Log Out</Link>
                </div>

            </div>
        </div>
    )
}

export default AdminTopBar
