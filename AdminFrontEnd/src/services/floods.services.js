import getAxiosInstance from "./axiosProvider";

export async function getFloodsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/floods?${query}`)

    return response;
}

export async function getSpecificFlood(token, floodId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/floods/${floodId}`);
    return response;
}

export async function deleteFlood(token, floodId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/floods/${floodId}`);
    return response;
}

export async function editFlood(token, floodId, floodObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`/floods/${floodId}`, floodObj);
    return response;
}

export async function addFlood(token, floodObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/floods`, floodObj);
    return response;
}

export async function getPrediction(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/flood_prediction_heatmap`);
    return response;
}