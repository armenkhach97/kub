export function getQuery(limit, page) {
    const query = {}
    query.limit = limit
    query.skip = page * limit

    var queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
    return queryString
}

export function getError(error) {
    if (!error) {
        return "Something went wrong"
    } else if (typeof error === "string") {
        return error
    } else {
        return error.response?.data?.message || error.response?.message || error.message || `${error}`
    }
}

export function convertDate(dateRange) {
    if (!dateRange)
        return ""
    return dateRange.split(" - ")
        .map(date => new Intl.DateTimeFormat('en-In').format(new Date(date)))
        .join(" - ")
}

export function isValidEmail(email = "") {
    if (!email) {
        return false
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    return (false)
}

export function getMM(m) {
    if (!m) { return "00" }
    if (m > 9) { return `${m}` }
    else { return `0${m}` }

}
export function trimJSON(json) {
    const newJson = {}
    for (const property in json) {
        const value = json[property]
        if (typeof value === "string") {
            newJson[property] = value.trim()
        } else {
            newJson[property] = value
        }
    }
    return newJson
}


export const range = (from, to, step) =>
    [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
