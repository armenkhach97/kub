function getDomain() {
    return "localhost"
    // const url = window.location.hostname;
    // let hostname = url.split(".").slice(-2);
    // return hostname.length === 1 ? "localhost" : `.${hostname.join(".")}`;
}

const cookieOptions = {
    httpOnly: true,
    path: "/",
    maxAge: 365 * 24 * 60 * 60,
    domain: getDomain(),
    sameSite: "strict",
    SameSite: "Lax",
    secure: getDomain() !== "localhost"
};

const URLS = {
    API: import.meta.env.VITE_APP_API + "api",

};

const getAccessToken = function getAccessToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        return null
    }
    return `Bearer ${token}`
};

const API_CONFIG = {
    headers: {
        "Authorization": getAccessToken(),
    }
}

const getUserEmail = function getUserEmail() {
    return localStorage.getItem("u_email");
};

const getUserId = function getUserId() {
    return localStorage.getItem("uid");
};

const getUserName = function getUserName() {
    return localStorage.getItem("u_name") || ""
}


const getUserStatus = function getUserStatus() {
    return localStorage.getItem("u_status")
}

const getUserAccountType = function getUserAccountType() {
    return localStorage.getItem("u_accountType")
}
const getToken = function getToken() {
    return localStorage.getItem("token");
};

const logout = function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("u_email");
    localStorage.removeItem("uid");
    localStorage.removeItem("u_name");
    localStorage.removeItem("u_accountType");
    location.reload();
};


export {
    URLS,
    getAccessToken,
    getUserId,
    getUserEmail,
    getUserName,
    getUserStatus,
    getToken,
    getUserAccountType,
    logout,
    cookieOptions,
    API_CONFIG,
};
