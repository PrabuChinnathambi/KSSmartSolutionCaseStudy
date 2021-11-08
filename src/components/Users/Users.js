import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import axios from 'axios';
import './Users.css';
import editIcon from '../../Assets/Icons/editIcon.png';
import profilePic from '../../Assets/Icons/profilePic.png';
import AdminTopBar from '../AdminTopBar/AdminTopBar';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Users = () => {

    const [userDatas, setUserDatas] = useState([]);

    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token);

    useEffect(() => {
        getUserDatas();
        AOS.init({
            duration : 2000
          });

    }, [])

    const getUserDatas = async () => {

        await axios.get('http://localhost:8080/api/allVendros', {
            headers: { "Authorization": token }
        })
            .then((response) => {

                setUserDatas(response.data);
            }).catch((err) => {
                console.log(err)
            })
    }

    console.log(userDatas)

    return (
        <div className="users_page">
            <div className="navbar">
                <AdminNavbar />
            </div>
            <div className="users_body">
                <div data-aos="fade-down" data-aos-delay="100">
                    <AdminTopBar />
                </div>
                <div className="users_container">
                    <table className="styled-table" data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>District</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userDatas.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="name"><img src={profilePic} alt='editIcon' />{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.password}</td>
                                            <td>{data.role}</td>
                                            <td>{data.district}</td>
                                            <td className="edit"><img src={editIcon} alt='editIcon' /></td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Users
