import Home from "./pages/Home";
import "./App.css";
import { useEffect } from "react";
import init from "./utils/init";

function App() {
  useEffect(() => {
    init();
  });
  return <Home />;
}

export default App;
