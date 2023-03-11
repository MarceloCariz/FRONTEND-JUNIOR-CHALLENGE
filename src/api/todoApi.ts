import axios from "axios";




export const todoApi = axios.create({
    baseURL: 'https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos'
})
