import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  const navigate = useNavigate()
  const postURL = "http://localhost:4000/Login";
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);

    axios.post(postURL, state)
      .then(function (response) {
        navigate("/Home")
        alert("you are now login");
        localStorage.removeItem("token");
        localStorage.setItem("token",response.data.token)
        return console.log("Signup successfully", response);
       

      })
      
      .catch(function (error) {
        return console.log("Login : Enter all details correctly", error)
        
      });


  };



  return (

    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h3 className="Auth-form-title">Sign In</h3>
      <form onSubmit={handleSubmit} method="POST">
        <div className="mb-3">
          <label className="form-label text-capitalize">Email</label>
          <input
            type="email"
            className="form-control"
            required
            name="email"
            onChange={handleChange}
            placeholder="Enter Email"
            value={state.email}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-capitalize">password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            value={state.password}
            required
            name="password"
            className="form-control mt-1"
            placeholder="Enter password"

          />

        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>

  );
}