import axios from "axios";

const API = axios.create({
    baseURL: "http://4.224.186.213/evaluation-service"
});

API.interceptors.request.use((config) => {

    config.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYW5kdXJ1YWpheTgyMEBnbWFpbC5jb20iLCJleHAiOjE3ODI1NDc5OTEsImlhdCI6MTc4MjU0NzA5MSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImI5NTU2MDkxLWNmNGQtNDIxMS1iMmIxLTYzNTIzN2VjYmNkNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImsgYWpheSIsInN1YiI6ImQzZWExYmFiLTA4ZDMtNDEwYS1iMWE3LWNjNjEzNWYyY2MxZSJ9LCJlbWFpbCI6ImthbmR1cnVhamF5ODIwQGdtYWlsLmNvbSIsIm5hbWUiOiJrIGFqYXkiLCJyb2xsTm8iOiIyM2hyMWEzMDI0IiwiYWNjZXNzQ29kZSI6ImFUa3licyIsImNsaWVudElEIjoiZDNlYTFiYWItMDhkMy00MTBhLWIxYTctY2M2MTM1ZjJjYzFlIiwiY2xpZW50U2VjcmV0IjoiSENkdEVqaGJDUmtyckdDVCJ9.3Wf4V41g7HNRi1jSN64vE7dB-ez0J0ura4I_BaiFusE";

    return config;
});

export const getNotifications = async (
    page = 1,
    limit = 10,
    type = ""
) => {

    let url = `/notifications?page=${page}&limit=${limit}`;

    if (type) {
        url += `&notification_type=${type}`;
    }

    const response = await API.get(url);

    return response.data.notifications;
};