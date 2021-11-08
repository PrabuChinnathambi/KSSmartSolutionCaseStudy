import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import './AdminAddUser.css';
import AdminTopBar from '../AdminTopBar/AdminTopBar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AOS from 'aos';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AdminAddUser = () => {

    const [addUser, setAddUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        district: ""
    })
    const [adminUsers, setAdminUsers] = useState([])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {

        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    useEffect(() => {
        getAdminUsers();
        AOS.init({
            duration : 1000
          });

    }, [])

    // const token = localStorage.getItem("token");
    // const config = {
    //     headers: { "Authorization": token }
    // };


    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token);




    const handleChangeAddUser = (e) => {
        setAddUser({
            ...addUser, [e.target.name]: e.target.value
        })
    }

    const getAdminUsers = async () => {

        await axios.get('http://localhost:8080/api/getAllAdmins', { headers: { "Authorization": token } })
            .then((response) => {
                console.log(response);
                setAdminUsers(response.data);
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleClickAddUser = async (e) => {
        e.preventDefault();

        if (addUser.name === "" || addUser.email === "" || addUser.password === "" || addUser.role === "" || addUser.district === "") {
            toast("All fields are required");
        } else {
            if (addUser.role === "user") {
                await axios.post('http://localhost:8080/api/registerVendor', addUser, { headers: { "Authorization": token } })
                    .then((response) => {
                        toast("User Added Successfully!");
                        setAddUser({
                            name: "",
                            email: "",
                            password: "",
                            role: "",
                            district: ""
                        })
                    }).catch((err) => {
                        toast(err.response.data.message)
                    })
            } else {
                await axios.post('http://localhost:8080/api/registerAdmin', addUser, { headers: { "Authorization": token } })
                    .then((response) => {
                        toast("Admin Added Successfully!");
                        setAddUser({
                            name: "",
                            email: "",
                            password: "",
                            role: "",
                            district: ""
                        })
                    }).catch((err) => {
                        toast(err.response.data.message)
                    })
            }
        }


    }

    console.log(adminUsers);




    return (
        <div>
            <div className="navbar">
                <AdminNavbar />
            </div>
            <div className="add_user_body">
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
                <div  data-aos="fade-down" data-aos-delay="100">
                    <AdminTopBar />
                </div>
                <div className="add_user_container">
                    <div className="add_user_card" data-aos="fade-up" data-aos-delay="100">
                        <div className="add_user_head">
                            <h2>Add User</h2>
                            <button type="submit" onClick={handleOpen}>View All Admin Users</button>
                        </div>
                        <div>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <Box sx={style}>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Email ID</TableCell>
                                                        <TableCell>Role</TableCell>
                                                        <TableCell>District</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {adminUsers.map((row) => (
                                                        <TableRow
                                                            key={row.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {row.name}
                                                            </TableCell>
                                                            <TableCell >{row.email}</TableCell>
                                                            <TableCell >{row.role}</TableCell>
                                                            <TableCell >{row.district}</TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Fade>
                            </Modal>
                        </div>
                        <div className="form_data">

                            <div className="form_field">
                                <p >Name :</p>
                                <input type="text" placeholder="Enter Your Name" name="name" value={addUser.name} onChange={handleChangeAddUser} />
                            </div>
                            <div className="form_field">
                                <p>Email ID :</p>
                                <input type="email" placeholder="example@gmail.com" name="email" value={addUser.email} onChange={handleChangeAddUser} />
                            </div>
                            <div className="form_field">
                                <p>Password :</p>
                                <input type="password" placeholder="Enter 10 Digits" name="password" value={addUser.password} onChange={handleChangeAddUser} />
                            </div>
                            <div className="form_field">
                                <p>Role :</p>
                                <select name="role" id="role" className="selectTag" name="role" value={addUser.role} onChange={handleChangeAddUser}>
                                    <option value="">Admin/Vendor</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Vendor</option>
                                </select>
                            </div>
                            <div className="form_field">
                                <p>District :</p>
                                <select name="dictrict" id="dictrict" className="selectTag" name="district" value={addUser.district} onChange={handleChangeAddUser}>
                                    <option value="">Select Dictrict</option>
                                    <option value="chennai">Chennai</option>
                                    <option value="erode">Erode</option>
                                    <option value="coimbatore">Coimbatore</option>
                                    <option value="thindukal">Thindukal</option>
                                    <option value="namakkal">Namakkal</option>
                                    <option value="tirupur">Tirupur</option>
                                </select>
                            </div>
                            <input onClick={handleClickAddUser} className="add_user_button" type="submit" value="Add User" />

                        </div>


                    </div>
                </div>

            </div>

        </div>
    )
}

export default AdminAddUser
