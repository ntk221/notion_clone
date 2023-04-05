import axios from "axios";

const getUserData = async () => {
    try {
      const response = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export default getUserData;