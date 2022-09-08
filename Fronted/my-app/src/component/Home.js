import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
function Home() {
  const [data, setData] = useState();
  
  const getURL = "http://localhost:4000";

  useEffect(() => {
    loaddata();
  }, [])

  const loaddata = async () => {
    const result = await axios.get(getURL);
    setData(result.data);
  };
  let navigate = useNavigate();
  function loggedout() {
    localStorage.clear();
    navigate('/Login')
  }
function goToUpdate(){
  navigate('/update')
}

  return (
    <>
      <div>
        <h1>Data from MongoDB</h1>
        <h2>You are now Login</h2>
        <button className="btn btn-primary mb-1" onClick={loggedout}>Logout</button>
        <button className="btn btn-primary ml-1" onClick={goToUpdate}>click for Update</button>
        <table className="table table-hover"
          style={{ border: "1px solid black" }}>
          <thead className="table-dark">

            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              
            </tr>
          </thead>
          <tbody>
            {data?.map((data, index) => {
              return (
                <tr>
                  <td>{index + 1}.</td>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                </tr>)
            })}
          </tbody>
        </table>

      </div>


    </>
  )


}


export default Home;