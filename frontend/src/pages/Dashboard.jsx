import React from 'react'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await fetch("http://localhost:5000/api/auth/logout", {
          method: "GET",       
          credentials: "include",
        });
        toast.success("Logged out successfully");
        navigate("/login");
    };
    
  return (
    <div className='mt-32'>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard