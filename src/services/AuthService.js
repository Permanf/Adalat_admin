import api from "./api.service";

export default class AuthService {
    static async login(username, password)
    {
        return await api.post('/auth/login', {username, password})
    }

    static async me()
    {
        return await api.post('/auth/me')
    }

    static async logout()
    {
        return await api.post('/auth/logout')
    }
}