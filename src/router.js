import CodeClipboard from "./CodeClipboard";
import TextConverter from "./TextConverter";

const routes = [
  {
    path: "/",
    element: <CodeClipboard />,
  },
  {
    path: "/converter",
    element: <TextConverter />,
  },
];

export default routes;
