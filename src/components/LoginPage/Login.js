import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import bg1 from '../../Assets/Images/bg1.jpg'

const Login = () => {

    let history = useHistory();

    const [roll, setRoll] = useState('admin');
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })


    const handleLoginRollUser = () => {
        setRoll('user')
    }

    const handleLoginRollAdmin = () => {
        setRoll('admin')
    }

    const handleChange = (e) => {
        setLogin({
            ...login, [e.target.name]: e.target.value
        })
    }

    const hanldeClickLogin = (e) => {
        e.preventDefault();

        var mail_format = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const email_check = mail_format.test(login.email);

        if (login.email === "" || login.password === "") {
            toast("All fields are required");
        }
        else if (!email_check) {
            toast("Email ID is Incorrect");
        } else {
            const payload = {
                email: login.email,
                password: login.password
            }
            if (roll === "admin") {
                axios.post('http://localhost:8080/api/loginAdmin', payload)
                    .then((response) => {
                        console.log(response);

                        const currentUser = {
                            name: response.data.name,
                            email: response.data.email,
                            district: response.data.district,
                            id: response.data.id
                        }

                        localStorage.setItem("token", JSON.stringify(response.data.token));
                        localStorage.setItem("currentUser", JSON.stringify(currentUser));

                        toast("Successfully LogedIn");
                        // console.log(JSON.stringify(localStorage.getItem("token")));
                        // console.log(JSON.stringify(localStorage.getItem("currentUser")));

                        setLogin({
                            email: "",
                            password: ""
                        })
                        history.push("/adminDashboard");

                    }).catch((err) => {
                        toast(err.response.data.message);
                    })
            } else if (roll === "user") {
                axios.post('http://localhost:8080/api/loginVendor', payload)
                    .then((response) => {
                        const currentUser = {
                            name: response.data.name,
                            email: response.data.email,
                            district: response.data.district,
                            id: response.data.id
                        }

                        localStorage.setItem("token", JSON.stringify(response.data.token));
                        localStorage.setItem("currentUser", JSON.stringify(currentUser));

                        toast("Successfully LogedIn");
                        // console.log(JSON.stringify(localStorage.getItem("token")));
                        // console.log(JSON.stringify(localStorage.getItem("currentUser")));

                        setLogin({
                            email: "",
                            password: ""
                        })
                        history.push("/vendorDashboard");
                    }).catch((err) => {
                        toast(err.response.data.message);
                    })
            } else {
                toast("something went wrong")
            }
        }
    }




    return (
        <div className="login_page" >
            {/* <img src={bg1} alt="bg1" /> */}
            <div className="relative" >
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
                <section className="bg-blueGray-50">
                    <div className="w-full lg:w-4/12 mx-auto px-4  pt-6">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-500 text-sm font-bold">
                                        Sign in with
                                    </h6>
                                </div>
                                <div className="btn-wrapper text-center">
                                    <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
                                        <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/github.svg" />Github</button>
                                    <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
                                        <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg" />Google </button>

                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-8 font-bold">
                                    <small className={roll === "admin" ? `rollbtn ${roll}` : "rollbtn"} onClick={handleLoginRollAdmin} >As Admin</small>

                                    <small className={roll === "user" ? `rollbtn ${roll}` : "rollbtn"} onClick={handleLoginRollUser} >As User</small>
                                </div>
                                <form >
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Email</label><input value={login.email} name="email" onChange={handleChange} type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Password</label><input type="password" value={login.password} name="password" onChange={handleChange} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password" />
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center cursor-pointer"><input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" /><span className="ml-2 text-sm font-semibold text-blueGray-600">Remember me</span></label>
                                    </div>
                                    <div className="text-center mt-6">
                                        <button onClick={hanldeClickLogin} className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button"> Sign In </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <footer className="relative pt-8 pb-6 mt-2">
                        <div className="container mx-auto px-2">
                            <div className="flex flex-wrap items-center md:justify-between justify-center">
                                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                    <div className="text-sm text-blueGray-500 font-semibold py-1">
                                    Made with ❤️ by Prabu...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </section>
            </div>
        </div>
    )
}

export default Login
