function set(key, value) {
    let strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function get(key) {
    let value = localStorage.getItem(key);
    return JSON.parse(value)
}

function getOrDefault(key, _default) {
    let value = localStorage.getItem(key);
    if (value == null) {
        set(key, _default);
        return _default;
    } else {
        return JSON.parse(value);
    }
}

function clear() {
    localStorage.clear();
}