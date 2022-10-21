import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "./storage";

const init = () => {
  const cfg = getLocalStorage("config");
  const data = getLocalStorage("data");
  if (!cfg || JSON.stringify(cfg) === "{}") {
    const cfg = {
      listType: "matrix",
    };
    setLocalStorage("config", cfg);
  }
  if (!data || JSON.stringify(data) === "[]") {
    setLocalStorage("data", []);
  }
};

export default init;
