import axios from "axios";

const fetchArticles = async (userId : string) => {
    try {
      const response = await axios.get("/articles", {
        params : {
            userId: userId
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export default fetchArticles;