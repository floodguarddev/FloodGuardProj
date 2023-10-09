import axios from "axios";
function getAxiosInstance(token){
    const instance = axios.create({
        baseURL: 'http://localhost:80/admins/',
        withCredentials: true,
        credentials: 'include'
      });
    
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    
    return instance;
}


export default getAxiosInstance;