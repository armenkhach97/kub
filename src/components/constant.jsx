import { format } from "date-fns"

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// export const STATUS = ["Active", "Inactive"];

export function todayDay() {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date().getDay()];
};


export function todayMonth() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[new Date().getMonth()];
};

export function todayDate() {
    const today = new Date()
    return today.getDate();
};

export function todayTime() {
    const today = new Date()
    return today.getHours();
};

export function todayYear() {
    const today = new Date()
    return today.getFullYear();
};

export function fDateTime3(date) {
    if (!date) {
        return ""
    }

    const dArray = date.split('/')
    if (dArray.length !== 3) {
        return date
    }
    return `${dArray[1]}/${dArray[0]}/${dArray[2]}`
}
export function fDateTime4(date) {
    console.log(">>>", date)
    return format(new Date(date), 'dd/MM/yyyy');
}


export const STATUS = ["new", "active", "cancel", "over"]
