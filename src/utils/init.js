import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "./storage";

const init = () => {
  const cfg = getLocalStorage("config");
  if (!cfg || JSON.stringify(cfg) === "{}") {
    const cfg = {
      listType: "matrix",
    };
    setLocalStorage("config", cfg);
  }
};

export default init;
