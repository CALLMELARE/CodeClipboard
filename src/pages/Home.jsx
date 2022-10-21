import { Button, Layout, Progress } from "@douyinfe/semi-ui";
import { IconServer, IconSetting, IconPlus } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import {
  getLocalStorageVolume,
  getLocalStorage,
  sizeFormat,
} from "../utils/storage";
import CodeList from "../components/CodeList";
import CodeMatrix from "../components/CodeMatrix";
import CodeEdit from "../components/CodeEdit";

const { Header, Footer, Content } = Layout;

const Home = () => {
  const [percent, setPercent] = useState(0);
  const [used, setUsed] = useState(0);
  const [maxVolumn, setMaxVolumn] = useState(5 * 1024 * 1024);
  const [listType, setListType] = useState("");
  const [data, setData] = useState();
  const [showAdd, setShowAdd] = useState(false);

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

  const handleShowAdd = () => {
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  return (
    <Layout>
      <Header className="cc-header">
        <span className="logo">
          Code Clipboard
          <Button
            theme="borderless"
            style={{ marginLeft: "8px" }}
            onClick={handleShowAdd}
            icon={<IconPlus />}
          ></Button>
        </span>
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
      <CodeEdit visible={showAdd} close={handleCloseAdd} />
    </Layout>
  );
};

export default Home;
