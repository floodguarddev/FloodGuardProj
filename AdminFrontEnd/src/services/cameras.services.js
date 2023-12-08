import getAxiosInstance from "./axiosProvider";

export async function getCamerasList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/cameras?${query}`)

    return response;
}
export async function deleteCamera(token, cameraId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/cameras/${cameraId}`);
    return response;
}

export async function editCamera(token, cameraId, cameraObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`/cameras/${cameraId}`, cameraObj);
    return response;
}

export async function addCamera(token, cameraObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/cameras`, cameraObj);
    return response;
}