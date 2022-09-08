import { useState } from "react";
import axios from "axios";

export default function App() {
  const [state, setState] = useState({
    email: "",
    password:"",
    username:""
  });

  const handleChange = (e) => {
    e.persist();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const postURL = "http://localhost:4000/Signup";
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);

    axios.post(postURL, state)
    .then((success) => {
      alert("account created")
      return console.log("Details are correct", success)
    })
    .catch((fail) => {
      return console.log("User already exits", fail)
    });
  };


  
  return (
    
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h3 className="Auth-form-title">Create New Account</h3>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label className="form-label text-capitalize">Name</label>
          <input
            type="text"
            className="form-control"
            required
            name="username"
            onChange={handleChange}
            placeholder="Enter Name"
            value={state.username}
          />
        </div>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}