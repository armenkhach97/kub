import axios from "axios";
import { getError } from "../utils/commonUtils";
import { URLS, API_CONFIG, getUserId } from "./constant"


export function getRoomActions(callback, status) {
    // const userId = getUserId()
    const query = {}
    // query.userId = userId
    if (status) {
        query.status = "active"
    }
    const where = JSON.stringify(query)
    axios.get(`${URLS.API}/room?where=${where}`, API_CONFIG)
        .then(function (response) {

            callback({ data: response.data.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}


export function addRoomAction(params, callback) {
    params.addedBy = getUserId()
    axios.post(`${URLS.API}/room`, params, API_CONFIG)
        .then(function (response) {

            callback({ data: response.data.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}


export function editRoomAction(params, callback) {
    axios.patch(`${URLS.API}/room/${params._id}`, params, API_CONFIG)
        .then(function (response) {

            callback({ data: response.data.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}




export function deleteRoomAction(params, callback) {
    axios.delete(`${URLS.API}/room/${params._id}`, API_CONFIG)
        .then(function (response) {

            callback({ data: response.data.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}