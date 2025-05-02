import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

export const postPrediction = async (machineData) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, machineData);
    return response.data;
  } catch (error) {
    console.error("Error predicting:", error);
  }
};
