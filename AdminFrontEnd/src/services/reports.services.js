import getAxiosInstance from "./axiosProvider";

export async function getUsersReport(token){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/reports/users`)

    return response;
}