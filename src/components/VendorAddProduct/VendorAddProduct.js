import React, { useState } from 'react';
import './VendorAddProduct.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const VendorAddProduct = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [addProduct, setAddProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        vendorId: currentUser.id
    })
    const [fileTagID, setFileTagID] = useState("#id");

    const handleAddProductChange = (e) => {
        e.preventDefault();

        setAddProduct({
            ...addProduct, [e.target.name]: e.target.value
        })
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const fileSize = file.size / 1024 / 1024; // in MiB
        if (fileSize > 2) {
            toast("File size exceeds 2 MiB")
            setFileTagID('');
        } else {
            const base64 = await convertBase64(file)
            setAddProduct({
                ...addProduct, image: base64
            })
        }


    }

    const hanldeClickAddProduct = async () => {

        axios.post("https://kssmartcasestudy.herokuapp.com/api/addProduct", addProduct)
            .then((response) => {
                console.log(response)
                toast("Product Added Successfully...!");
                setAddProduct({
                    name: "",
                    description: "",
                    price: "",
                    image: ""
                })
                setFileTagID('');
                window.location.reload(true);
            })

    }



    return (
        <div className="add_product" >
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
            <div className="form_data">
                <h2>Add Products</h2>
                <div className="form_field">
                    <p >Name :</p>
                    <input type="text" placeholder="Enter Your Name" name="name" value={addProduct.name} onChange={handleAddProductChange} />
                </div>
                <div className="form_field">
                    <p>Description :</p>
                    <textarea name="description" value={addProduct.description} onChange={handleAddProductChange}  ></textarea>
                </div>
                <div className="form_field">
                    <p>Price :</p>
                    <input type="email" placeholder="example@gmail.com" name="price" value={addProduct.price} onChange={handleAddProductChange} />
                </div>
                <div className="form_field">
                    <p>Image :</p>
                    <input key={fileTagID} type="file" onChange={handleFileRead} name="image" accept="image/x-png,image/gif,image/jpeg" />
                </div>

                <input onClick={hanldeClickAddProduct} className="add_user_button" type="submit" value="Add Product" />
            </div>
        </div>
    )
}

export default VendorAddProduct
