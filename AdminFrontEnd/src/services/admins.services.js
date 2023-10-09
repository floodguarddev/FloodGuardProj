import getAxiosInstance from "./axiosProvider";

export async function getAdminsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/admins?${query}`)

    return response;
}

export async function getSpecificAdmin(token, adminId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/admins/${adminId}`);
    return response;
}

export async function deleteAdmin(token, adminId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/admins/${adminId}`);
    return response;
}

export async function editAdmin(token, adminId, adminObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`/admins/${adminId}`, adminObj);
    return response;
}

export async function addAdmin(token, adminObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/admins`, adminObj);
    return response;
}