import { Provider, useSelector, useDispatch } from "react-redux";
import CodeClipboard from "./CodeClipboard";
import store from "./store";

const Home = () => {
  return (
    <Provider store={store}>
      <CodeClipboard />
    </Provider>
  );
};

export default Home;
