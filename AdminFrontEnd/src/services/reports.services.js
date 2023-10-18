import getAxiosInstance from "./axiosProvider";

export async function getUsersReport(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/reports/users`)

    return response;
}

export async function getDonationsReport(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/reports/donations`)

    return response;
}

export async function getNgosReport(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/reports/ngos`)

    return response;
}

export async function getNgosSummary(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/reports/ngosSummary`)

    return response;
}

export async function getUsersSummary(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/reports/usersSummary`)

    return response;
}

export async function getDonationsSummary(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/reports/donationsSummary`)

    return response;
}