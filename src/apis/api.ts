import apiClient from "./http";

export const getApi = (url: string, params: any) => {
    return apiClient.get(url, { params });
};

export const getDownloadApi = (url: string, params: any) => {
    return apiClient.get(url, { ...params, responseType: "blob" });
};

export const postApi = (url: string, data: any) => {
    return apiClient.post(url, data);
};

export const postFormApi = (url: string, data: any) => {
    return apiClient.postForm(url, data);
};

export const putApi = (url: string, data: any) => {
    return apiClient.put(url, data);
};

export const deleteApi = (url: string) => {
    return apiClient.delete(url);
};

export const patchApi = (url: string, data: any) => {
    return apiClient.patch(url, data);
};

