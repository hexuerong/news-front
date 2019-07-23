function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function canJsonStringify(obj) {
    try {
        JSON.stringify(obj);
    } catch (e) {
        return false;
    }
    return true;
}

export {
    isJsonString,
    canJsonStringify,
}