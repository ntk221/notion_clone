import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar'
import Home from './Home';
import axios from "axios";


const DashBoard = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    id: ""
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/user", {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }},);
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [localStorage.getItem("token")]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
        <SideBar username={ userData.username } notes={["記事1", "記事２", "記事３"]} onNoteClick={(note: string) => {console.log(note)}}/>
        <Home userId={ userData.id }/>
    </>
  )
}

export default DashBoard
