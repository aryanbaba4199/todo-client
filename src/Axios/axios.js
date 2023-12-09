import axios from "axios"


// --------Connecting to Backend --------
const instance = axios.create({
    baseURL:"http://todo-server-raushan-kumars-projects-60d040ea.vercel.app/api"
})
export default instance;