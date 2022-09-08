import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from "react";
import "./App.css";
import Home from "./component/Home";
import Signup from "./component/Signup";
import Login from "./component/Login";
import update from "./component/update";
import Dashboard from "./component/Dashboard";
import Protected from "./component/Protected";

function App() {

  return (
    <div className="container mt-5">



      <Router>
        <div className="App">
          <ul className="" >
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            {!localStorage.getItem("token") ?
              <>
                <li>
                  <Link to="/Signup">Signup </Link>
                </li>
                <li>
                  <Link to="/Login">Login</Link>
                </li>
                
              </>
              : null
            }
          </ul>
          <Routes>
            <Route exact path='/' element={< Dashboard />}></Route>

            <Route exact path='/Signup' element={< Signup />}></Route>
            <Route exact path='/Login' element={< Login />}></Route>

            <Route exact path="/Home" element={<Protected Component={Home} />} />
            <Route exact path="/update" element={<Protected Component={update} />} />
            
          </Routes>
        </div>
      </Router>
    </div>
  );
  

}

export default App;


