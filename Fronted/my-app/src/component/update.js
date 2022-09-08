import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router'
function Update() {
    const [user, setUser] = useState({
        username:""
});
    
    const token = localStorage.getItem("token");
    useEffect(() => {
        const tokenUser = jwt_decode(token);
        if (tokenUser) {
            setUser(tokenUser.user)
        }
    },[]);
    const ide = user._id;
    console.log(ide, "idessss")
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }))
    }
    const update=async(e)=> {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:4000/update/${ide}`, {
                user
            });
            console.log(res)
            if (res.data.status === 200) {
                navigate('/Home')
            }
            console.log('username updated successfully')
        } catch (error) {
            console.log(error,"updated error");
        }
    }
    console.log(user);
    return (
        <>

            <h3>You can only change your name</h3>
            <input type="text" className="mb-1" onChange={handleChange} value={user.username} name="username" />   <br />
            <button className="mb-1" onClick={update}>Update</button>
        </>
    )
}

export default Update;