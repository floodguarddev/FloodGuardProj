import getAxiosInstance from "./axiosProvider";

export async function getNewsList(token, query){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/news?${query}`)

    return response;
}

export async function getSpecificNews(token, newsId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.get(`/news/${newsId}`);
    return response;
}

export async function deleteNews(token, newsId){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.delete(`/news/${newsId}`);
    return response;
}

export async function editNews(token, newsId, newsObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.put(`/news/${newsId}`, newsObj);
    return response;
}

export async function addNews(token, newsObj){
    let axiosInstance = getAxiosInstance(token);
    let response = await axiosInstance.post(`/news`, newsObj);
    return response;
}