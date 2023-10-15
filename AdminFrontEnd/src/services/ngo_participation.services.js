import getAxiosInstance from "./axiosProvider";

export async function getNgoParticipationsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngo_participation_posts?${query}`)

    return response;
}

export async function getSpecificNgoParticipation(token, ngoParticipationId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngo_participation_posts/${ngoParticipationId}`);
    return response;
}

export async function deleteNgoParticipation(token, ngoParticipationId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/ngo_participation_posts/${ngoParticipationId}`);
    return response;
}

export async function editNgoParticipation(token, ngoId, ngoParticipationId, ngoParticipationObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`ngos/${ngoId}/ngo_participation_posts/${ngoParticipationId}`, ngoParticipationObj);
    return response;
}

export async function addNgoParticipation(token, ngoId, ngoParticipationObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/ngos/${ngoId}/ngo_participation_posts`, ngoParticipationObj);
    return response;
}

export async function getNgoParticipationRequestsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngo_participation_requests?${query}`)

    return response;
}

export async function getSpecificNgoParticipationRequest(token, ngoParticipationRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/ngo_participation_requests/${ngoParticipationRequestId}`);
    return response;
}

export async function rejectNgoParticipationRequest(token, ngoParticipationRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/ngo_participation_requests/reject/${ngoParticipationRequestId}`);
    return response;
}

export async function approveNgoParticipationRequest(token, ngoParticipationRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/ngo_participation_requests/approve/${ngoParticipationRequestId}`);
    return response;
}