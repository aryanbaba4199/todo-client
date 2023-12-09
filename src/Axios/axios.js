import axios from "axios"


// --------Connecting to Backend --------
const instance = axios.create({
    baseURL:"https://todo-server-coral.vercel.app/api"
})
export default instance;