import { alertConstants } from "./type/alert.constants";

export const alertActions = {
    success,
    error,
    clear,
    resetMsg,
    registerError,
    resetRegisterMsg,
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}

function resetMsg() {
    return { type: alertConstants.RESET };
}

function registerError(value) {
    return { type: alertConstants.REGISTRATION_ERROR, value };
}

function resetRegisterMsg() {
    return { type: alertConstants.RESET_REGISTER_MESSAGE };
}