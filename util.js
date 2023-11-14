export const sessionName = '';
export const sessionPass = '';
export const dvCommand = '';
export const adminSess = "";
//REAL
export const baseApiUrl = 'https://mechanic.garage.mn/';
export const urlService = '';
export const urlName = '';
export const urlServiceFile = '';

export const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date
    }
    var year = new Date().getFullYear();
    return year + '-' + month + '-' + date;
};

export const getNextDate = () => {
    var date = new Date().getDate() + 1;
    var month = new Date().getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date
    }
    var year = new Date().getFullYear();
    return year + '-' + month + '-' + date;
};

export const getPastSevenDate = () => {
    var current = new Date();
    var date = current.getDate() - 7;
    var month = current.getMonth() + 1;
    if (date < 10) {
        date = "0" + date
    }
    if (month < 10) {
        month = "0" + month;
    }
    var year = current.getFullYear();
    return year + '-' + month + '-' + date;
};

export const getCurrentTime = () => {
    var hour = new Date().getHours();
    var minute = new Date().getMinutes();
    var second = new Date().getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute
    }
    if (second < 10) {
        second = "0" + second
    }
    return hour + ':' + minute + ':' + second;
};

export const getNextTime = () => {
    var hour = new Date().getHours() + 1;
    var minute = new Date().getMinutes();
    var second = new Date().getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute
    }
    if (second < 10) {
        second = "0" + second
    }
    return hour + ':' + minute + ':' + second;
};
