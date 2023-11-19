import axios from "axios"

export const API = axios.create({
    baseURL: 'http://localhost:4000/v1/'
})

export const getConfig = async () => {
    const token = localStorage.getItem('token')

    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }

    return config
}