export const sessionName = 'admin';
export const sessionPass = '89';
export const dvCommand = 'PL_MDVIEW_004';
export const adminSess = "65178215-7896-4513-8e26-896df9cb36ad";

//TEST
// export const urlService = 'http://172.169.88.90:16945/erp-services/RestWS/runJson';
// export const urlName = 'https://chem-admin.interactive.mn/';
// export const urlServiceFile = 'http://172.169.88.90:16945/erp-services/RestWS/runJson';

//REAL
export const baseApiUrl = 'https://mechanic.garage.mn/';
export const urlService = 'http://203.26.189.33:8080/erp-services/RestWS/runJson';
export const urlName = 'https://chem-admin.met.gov.mn/';
export const urlServiceFile = 'http://203.26.189.33:8080/erp-services/FileServlet';

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
