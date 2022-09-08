import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
// import { put } from '../../../../userRoutes/userRoutes';
function Dashboard() {
    const [user, setUser] = useState();
    const [name, setname] = useState("");
    
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const ide = jwt_decode(token);
            setUser(ide.user);
            // console.log(ide);
        }

        if(user){
           setname(user.username)
        }
    }, []);
   
    const navigate = useNavigate();
    function deleteuser() {
        try {
            axios.delete(`/${user._id}`)
            console.log("user deleted ")
            localStorage.clear();

            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <>
            <h1>You are on Dashboard</h1>
            <h3>Login or Create Account for Data</h3>
            {localStorage.getItem("token") ?
                <>

                    <li>
                        <Link to="/Home">Go to Home Page</Link>
                    </li>
                    <button className="btn btn-primary mb-1" onClick={deleteuser}>Delete User</button>
                    {/* <button className="btn btn-primary mb-1" onClick={updateeuser}>Update User</button> */}
                    <br />
                   

                </>
                : null
            }
        </>
    )
}


export default Dashboard;