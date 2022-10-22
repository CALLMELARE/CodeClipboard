import { getLocalStorage, setLocalStorage } from "./storage";
const getAllCfg = () => {
  return new Promise((resolve, reject) => {
    const cfg = getLocalStorage("config");
    if (cfg) {
      resolve(cfg);
    } else {
      reject();
    }
  });
};

const getCfg = (key) => {
  return new Promise((resolve, reject) => {
    const cfg = getLocalStorage("config");
    if (cfg) {
      resolve(cfg[`${key}`]);
    }
  });
};

const setCfg = (key, value) => {
  return new Promise((resolve, reject) => {
    const cfg = getLocalStorage("config");
    if (cfg) {
      cfg[`${key}`] = value;
      setLocalStorage("config", cfg);
      resolve();
    }
  });
};

export { getAllCfg, setCfg, getCfg };
