import { Button, Layout, Progress } from "@douyinfe/semi-ui";
import { IconServer, IconSetting } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import {
  getLocalStorageVolume,
  getLocalStorage,
  sizeFormat,
} from "../utils/storage";
import CodeList from "../components/CodeList";
import CodeMatrix from "../components/CodeMatrix";

const { Header, Footer, Content } = Layout;

const Home = () => {
  const [percent, setPercent] = useState(0);
  const [used, setUsed] = useState(0);
  const [maxVolumn, setMaxVolumn] = useState(5 * 1024 * 1024);
  const [listType, setListType] = useState("");
  const [data, setData] = useState();

  // 更新用量
  setInterval(() => {
    setUsed(getLocalStorageVolume());
  }, 3000);

  useEffect(() => {
    // 加载配置
    const cfg = getLocalStorage("config");
    setListType(cfg.listType);
    // 加载数据
    const rawData = getLocalStorage("data");
    setData(rawData);
    // 用量计算
    setUsed(getLocalStorageVolume());
    const p = (used / maxVolumn) * 100;
    setUsed(used);
    setPercent(p);
  }, [maxVolumn, used]);

  return (
    <Layout>
      <Header className="cc-header">
        <span className="logo">Code Clipboard</span>
        <span className="func">
          <IconServer style={{ color: "#a9a9a9", marginRight: "8px" }} />
          <Progress className="progress" size="large" percent={percent} />
          <span className="info">
            {sizeFormat(used)} / {sizeFormat(maxVolumn)}
          </span>
          <Button
            theme="borderless"
            style={{ marginLeft: "8px" }}
            icon={<IconSetting style={{ color: "#a9a9a9" }} />}
          ></Button>
        </span>
      </Header>
      <Content>
        {listType === "list" ? <CodeList dataSource={data} /> : null}
        {listType === "matrix" ? <CodeMatrix dataSource={data} /> : null}
      </Content>
      <Footer className="cc-footer">Code Clipboard</Footer>
    </Layout>
  );
};

export default Home;
