import { Provider, useSelector, useDispatch } from "react-redux";
import CodeClipboard from "./CodeClipboard";
import store from "./store";

import init from "../utils/init";
init();

const Home = () => {
  return (
    <Provider store={store}>
      <CodeClipboard />
    </Provider>
  );
};

export default Home;
