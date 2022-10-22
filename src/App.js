import Home from "./pages/Home";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import init from "./utils/init";
init();
function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
