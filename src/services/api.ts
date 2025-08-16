import axios from "axios";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://puce.estudioika.com/api/examen.php";

export const loginUser = (user: string, pass: string) => {
  return axios.get(`${CORS_PROXY}${API_URL}`, {
    params: { user, pass }
  });
};

export const getRecords = (record: string | null) => {
  return axios.get(`${CORS_PROXY}${API_URL}`, {
    params: { record }
  });
};

export const postAttendance = (record_user: string | null, join_user: string | null) => {
  return axios.post(`${CORS_PROXY}${API_URL}`, { record_user, join_user });
};
