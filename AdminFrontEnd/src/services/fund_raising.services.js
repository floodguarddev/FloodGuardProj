import getAxiosInstance from "./axiosProvider";

export async function getFundRaisingsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/fund_raising_posts?${query}`)

    return response;
}

export async function getSpecificFundRaising(token, fundRaisingId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/fund_raising_posts/${fundRaisingId}`);
    return response;
}

export async function deleteFundRaising(token, fundRaisingId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/fund_raising_posts/${fundRaisingId}`);
    return response;
}

export async function editFundRaising(token, ngoId, fundRaisingId, fundRaisingObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`ngos/${ngoId}/fund_raising_posts/${fundRaisingId}`, fundRaisingObj);
    return response;
}

export async function addFundRaising(token, ngoId, fundRaisingObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/ngos/${ngoId}/fund_raising_posts`, fundRaisingObj);
    return response;
}

export async function getFundRaisingRequestsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/fund_raising_requests?${query}`)

    return response;
}

export async function getSpecificFundRaisingRequest(token, fundRaisingRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/fund_raising_requests/${fundRaisingRequestId}`);
    return response;
}

export async function rejectFundRaisingRequest(token, fundRaisingRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/fund_raising_requests/reject/${fundRaisingRequestId}`);
    return response;
}

export async function approveFundRaisingRequest(token, fundRaisingRequestId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/fund_raising_requests/approve/${fundRaisingRequestId}`);
    return response;
}