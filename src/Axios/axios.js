import axios from "axios"


// --------Connecting to Backend --------
const instance = axios.create({
    baseURL:"http://localhost:5000/api"
})
export default instance;