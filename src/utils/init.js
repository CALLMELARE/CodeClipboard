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
      listType: "triple",
      mode: "light",
      defaultType: "text",
      enableTitle: true,
      titleFormat: "[CodeSnippet]YYYYMMDD_HH:mm:ss",
    };
    setLocalStorage("config", cfg);
  }
  if (!data || JSON.stringify(data) === "[]") {
    setLocalStorage("data", []);
  }
};

export default init;
