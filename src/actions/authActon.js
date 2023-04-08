import axios from "axios";
import { getError } from "../utils/commonUtils";
import { API_CONFIG, URLS } from "./constant";

export function setCookie(key, value) {
    // Cookies.set(key, value, cookieOptions);
    localStorage.setItem(key, value)
}

export function loginAction(params, callback) {
    axios.post(`${URLS.API}/auth/login`, params, API_CONFIG)
        .then(function (response) {
            if (response.data) {
                const user = response.data.data
                setCookie("token", user.token)
                setCookie("uid", user._id)
                setCookie("u_name", user.userName)
                callback({ b: true, data: user })
            } else {
                callback({ b: false, error: response.message })
            }
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}

export function googleLoginAction(params, callback) {
    axios.post(`${URLS.API}/auth/google`, params, API_CONFIG)
        .then(function (response) {
            if (response.data) {
                const user = response.data.data
                setCookie("token", user.token)
                setCookie("uid", user._id)
                setCookie("u_name", user.userName)
                callback({ b: true, data: user })
            } else {
                callback({ b: false, error: response.message })
            }
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}


export function addUserAction(params, callback) {
    params.accountType = "user"
    let url = `${URLS.API}/user`
    if (params._id) {
        url = url + "/" + params._id
    }
    axios.put(url, params, API_CONFIG)
        .then(function (response) {
            if (response.data) {
                const user = response.data.data
                callback({ b: true, data: user })
            } else {
                callback({ b: false, error: response.message })
            }
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}

export function registerAction(params, callback) {
    params.accountType = "user"
    axios.post(`${URLS.API}/auth/register`, params, API_CONFIG)
        .then(function (response) {
            if (response.data) {
                const user = response.data.data
                setCookie("token", user.token)
                setCookie("uid", user._id)
                setCookie("u_name", user.userName)
                callback({ b: true, data: user })
            } else {
                callback({ b: false, error: response.message })
            }
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}


export function getProfileAction(callback) {
    axios.get(`${URLS.API}/auth/profile`, API_CONFIG)
        .then(function (response) {
            callback({ data: response.data.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}

export function updateProfile(params, callback) {
    params.userId = getUserId()
    const id = getUserId()
    axios.patch(`${URLS.API}/user/${id}`, params, API_CONFIG)
        .then(function (response) {
            callback({ data: response.data.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}

export function forgetPasswordAction(params, callback) {
    axios.post(`${URLS.API}/auth/reset-email`, params, API_CONFIG)
        .then(function (response) {
            callback({ message: response.data.message })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}

export function resetPasswordAction(params, callback) {
    axios.post(`${URLS.API}/auth/reset`, params, API_CONFIG)
        .then(function (response) {
            callback({ data: response.data.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}



export function verifyEmailAction(params, callback) {
    axios.post(`${URLS.API}auth/verify-email`, params, API_CONFIG)
        .then(function (response) {
            callback({ data: response.data.data });
        })
        .catch(function (error) {
            callback({ error: getError(error) });
        });
}
