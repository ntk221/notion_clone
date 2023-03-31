import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar'
import axios from "axios";


const DashBoard = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/user", {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }},);
        setUserData(response.data.username);
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  });

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  });

  return (
      <SideBar username={ userData } notes={["記事1", "記事２", "記事３"]} onNoteClick={(note: string) => {console.log(note)}}/>
  )
}

export default DashBoard