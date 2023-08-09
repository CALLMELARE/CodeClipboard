const getLocalStorageVolume = () => {
    if (!window.localStorage) {
        console.log('[CodeClipboard]浏览器不支持localStorage存储');
    }
    let size = 0;
    for (const item in window.localStorage) {
        if (window.localStorage.hasOwnProperty(item)) {
            size += window.localStorage.getItem(item).length;
        }
    }
    return size;
};

const setLocalStorage = (key, value) => {
    if (!key) return;
    if (typeof value === 'boolean') {
        if (value === true) {
            localStorage.setItem(key, '1');
        } else {
            localStorage.setItem(key, '0');
        }
    }
    if (typeof value === 'number') {
        localStorage.setItem(key, value.toString());
    }
    if (typeof value === 'string') {
        localStorage.setItem(key, value);
    }
    if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const getLocalStorage = (key) => {
    if (!key) return;
    const value = localStorage.getItem(key);
    if (value) {
        if (parseFloat(value).toString() !== 'NaN') {
            return parseFloat(value);
        }
        try {
            const result = JSON.parse(value);
            return result;
        } catch {
            return value;
        }
    }
};

const removeLocalStorage = (key) => {
    if (!key) return;
    localStorage.removeItem(key);
};

const sizeFormat = (size) => {
    if (size <= 1024) {
        return `${size}B`;
    } else if (size <= 1024 * 1024) {
        return `${(size / 1024).toFixed(2)}KB`;
    } else {
        return `${(size / 1024 / 1024).toFixed(2)}MB`;
    }
};

export { getLocalStorageVolume, setLocalStorage, getLocalStorage, removeLocalStorage, sizeFormat };
