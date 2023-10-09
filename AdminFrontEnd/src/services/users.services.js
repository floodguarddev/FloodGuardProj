import getAxiosInstance from "./axiosProvider";

export async function getUsersList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/users?${query}`)

    return response;
}

export async function getSpecificUser(token, userId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/users/${userId}`);
    return response;
}

export async function deleteUser(token, userId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/users/${userId}`);
    return response;
}

export async function editUser(token, userId, userObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`/users/${userId}`, userObj);
    return response;
}

export async function addUser(token, userObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/users`, userObj);
    return response;
}