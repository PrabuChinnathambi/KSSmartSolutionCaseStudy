import React, { useState } from 'react';
import './AdminNavbar.css';
import { Link } from 'react-router-dom'

const AdminPage = () => {

    const [menuBtn, setMenuBtn] = useState(false)


    const hanldeMenuBtn = () => {
        setMenuBtn(!menuBtn);
    }


    return (
        <div>
            <div className={menuBtn ? "sidebar open" : "sidebar "}>
                <div className="logo-details">
                    <i className='bx bxl-c-plus-plus icon'></i>
                    <div className="logo_name">KS Solutions</div>
                    <i className='bx bx-menu' id="btn" onClick={hanldeMenuBtn} ></i>
                </div>
                <ul className="nav-list">
                    {/* <li>
                        <i className='bx bx-search' onClick={hanldeMenuBtn} ></i>
                        <input type="text" placeholder="Search..." />
                        <span className="tooltip">Search</span>
                    </li> */}
                    <li>
                        <Link to="/adminDashboard">
                            <i className='bx bx-grid-alt'></i>
                            <span className="links_name">Dashboard</span>
                        </Link>
                        <span className="tooltip">Dashboard</span>
                    </li>
                    <li>
                        <Link to="/users">
                            <i className='bx bx-user' ></i>
                            <span className="links_name">Users List</span>
                        </Link>
                        <span className="tooltip">Users List</span>
                    </li>
                    <li>
                        <Link to="/addUser">
                            <i className='bx bx-user-plus' ></i>
                            <span className="links_name">Add User</span>
                        </Link>
                        <span className="tooltip">Add User</span>
                    </li>
                    <li>
                        <Link to="/pendingProducts">
                            <i className='bx bx-cart-alt' ></i>
                            <span className="links_name">Accept Product</span>
                        </Link>
                        <span className="tooltip">Accept Product</span>
                    </li>
                    <li>
                        <Link to="/acceptedProducts">
                            <i className='bx bx-heart' ></i>
                            <span className="links_name">View Product</span>
                        </Link>
                        <span className="tooltip">View Product</span>
                    </li>


                </ul>
            </div>
            {/* <section className="home-section">
                <div className="text">Dashboard</div>
            </section> */}
        </div>

    )
}

export default AdminPage
