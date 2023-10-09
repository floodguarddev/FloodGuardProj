import getAxiosInstance from "./axiosProvider";

export async function getPrecautionsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/precautions?${query}`)

    return response;
}

export async function getSpecificPrecautions(token, precautionsId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/precautions/${precautionsId}`);
    return response;
}

export async function deletePrecautions(token, precautionsId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/precautions/${precautionsId}`);
    return response;
}

export async function editPrecautions(token, precautionsId, precautionsObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`/precautions/${precautionsId}`, precautionsObj);
    return response;
}

export async function addPrecautions(token, precautionsObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/precautions`, precautionsObj);
    return response;
}