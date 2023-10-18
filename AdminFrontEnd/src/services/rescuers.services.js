import getAxiosInstance from "./axiosProvider";

export async function getNgoParticipationsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngo_participation_posts?${query}`)

    return response;
}

export async function getSpecificNgoParticipation(token, rescuerId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngo_participation_posts/${rescuerId}`);
    return response;
}

export async function deleteNgoParticipation(token, rescuerId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/ngo_participation_posts/${rescuerId}`);
    return response;
}

export async function editNgoParticipation(token, ngoId, rescuerId, rescuerObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`ngos/${ngoId}/ngo_participation_posts/${rescuerId}`, rescuerObj);
    return response;
}

export async function addNgoParticipation(token, ngoId, rescuerObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/ngos/${ngoId}/ngo_participation_posts`, rescuerObj);
    return response;
}

export async function getNgoParticipationRequestsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngo_participation_requests?${query}`)

    return response;
}

export async function getSpecificNgoParticipationRequest(token, rescuerRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngo_participation_requests/${rescuerRequestId}`);
    return response;
}

export async function rejectNgoParticipationRequest(token, rescuerRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/ngo_participation_requests/reject/${rescuerRequestId}`);
    return response;
}

export async function approveNgoParticipationRequest(token, rescuerRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/ngo_participation_requests/approve/${rescuerRequestId}`);
    return response;
}