import axios from "axios";
import { getError } from "../utils/commonUtils";
import { URLS, API_CONFIG, getUserId } from "./constant"


export function getUsersActions(callback, status) {
    // const userId = getUserId()
    const query = {}
    // query.userId = userId
    if (status) {
        query.status = status
    }
    query.accountType = "user"
    const where = JSON.stringify(query)
    axios.get(`${URLS.API}/user?where=${where}`, API_CONFIG)
        .then(function (response) {
            callback({ data: response.data.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}

export function editUserAction(params, callback) {
    axios.put(`${URLS.API}/user/${params._id}`, params, API_CONFIG)
        .then(function (response) {

            callback({ data: response.data.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}
