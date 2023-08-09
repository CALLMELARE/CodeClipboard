import { getLocalStorage, setLocalStorage } from './storage';

const getAllCfg = () =>
    new Promise((resolve, reject) => {
        const cfg = getLocalStorage('config');
        if (cfg) {
            resolve(cfg);
        } else {
            reject();
        }
    });

const getCfg = (key) =>
    new Promise((resolve) => {
        const cfg = getLocalStorage('config');
        if (cfg) {
            resolve(cfg[`${key}`]);
        }
    });

const setCfg = (key, value) =>
    new Promise((resolve) => {
        const cfg = getLocalStorage('config');
        if (cfg) {
            cfg[`${key}`] = value;
            setLocalStorage('config', cfg);
            resolve();
        }
    });

export { getAllCfg, setCfg, getCfg };
