import getAxiosInstance from "./axiosProvider";

export async function getNgosList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngos?${query}`)

    return response;
}

export async function getSpecificNgo(token, ngoId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngos/${ngoId}`);
    return response;
}

export async function deleteNgo(token, ngoId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/ngos/${ngoId}`);
    return response;
}

export async function editNgo(token, ngoId, ngoObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`ngos/${ngoId}`, ngoObj);
    return response;
}

export async function addNgo(token, userId, ngoObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/ngos/${userId}`, ngoObj);
    return response;
}

export async function getNgoRequestsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngo_requests?${query}`)

    return response;
}

export async function getSpecificNgoRequest(token, ngoRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngo_requests/${ngoRequestId}`);
    return response;
}

export async function rejectNgoRequest(token, ngoRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/ngo_requests/reject/${ngoRequestId}`);
    return response;
}

export async function approveNgoRequest(token, ngoRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/ngo_requests/approve/${ngoRequestId}`);
    return response;
}