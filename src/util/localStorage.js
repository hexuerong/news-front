import { isJsonString, canJsonStringify } from './tools';

function getLocalStorage(name) {
    let str = localStorage.getItem(name);
    if (isJsonString(str)) {
        var value = JSON.parse(str);
        return value;
    }
    return str;
}

function setLocalStorage(name, value) {
    if (canJsonStringify(value)) {
        localStorage.setItem(name, JSON.stringify(value));
    } else {
        localStorage.setItem(name, value);
    }
}

function removeLocalStorage(name) {
    localStorage.removeItem(name);
}

function clearLocalStorage() {
    localStorage.clear();
}

export {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
    clearLocalStorage
};