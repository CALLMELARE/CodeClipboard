import { Empty, Button, Layout, Progress } from "@douyinfe/semi-ui";
import {
  IconServer,
  IconSetting,
  IconPlus,
  IconInfoCircle,
} from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import {
  getLocalStorageVolume,
  getLocalStorage,
  sizeFormat,
} from "../utils/storage";
import CodeList from "../components/CodeList";
import CodeMatrix from "../components/CodeMatrix";
import CodeEdit from "../components/CodeEdit";
import CodeSettings from "../components/CodeSettings";
import { IllustrationNoResult } from "@douyinfe/semi-illustrations";
const { Header, Footer, Content } = Layout;

const Home = () => {
  const [percent, setPercent] = useState(0);
  const [used, setUsed] = useState(0);
  const [maxVolumn, setMaxVolumn] = useState(5 * 1024 * 1024);
  const [listType, setListType] = useState("");
  const [data, setData] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

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
  }, [maxVolumn, used, showSetting]);

  const handleShowAdd = () => {
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  const handleShowSetting = () => {
    setShowSetting(true);
  };

  const handleCloseSetting = () => {
    setShowSetting(false);
  };

  const CustomEmpty = () => {
    return (
      <Empty
        image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
        title="目前空空如也"
      >
        <Button
          onClick={handleShowAdd}
          style={{ padding: "6px 24px" }}
          icon={<IconPlus />}
          theme="solid"
          type="primary"
        >
          创建片段
        </Button>
        <Button
          style={{ marginLeft: "8px", padding: "6px 24px", marginRight: 12 }}
          type="primary"
        >
          阅读指南
        </Button>
      </Empty>
    );
  };

  return (
    <Layout>
      <Header className="cc-header">
        <span className="logo">Code Clipboard</span>
        <span className="func">
          <Button
            theme="borderless"
            style={{ marginRight: "8px" }}
            onClick={handleShowAdd}
            icon={<IconPlus />}
          ></Button>
          <IconServer style={{ marginRight: "8px" }} />
          <Progress className="progress" size="large" percent={percent} />
          <span className="info">
            {sizeFormat(used)} / {sizeFormat(maxVolumn)}
          </span>
          <Button
            theme="borderless"
            style={{ marginLeft: "8px" }}
            onClick={handleShowSetting}
            icon={<IconSetting />}
          ></Button>
        </span>
      </Header>
      <Content style={{ padding: "16px" }}>
        <CodeMatrix
          key="matrix"
          dataSource={data}
          listType={listType}
          Empty={CustomEmpty}
        />
      </Content>
      <Footer className="cc-footer"></Footer>
      <CodeEdit visible={showAdd} close={handleCloseAdd} />
      <CodeSettings visible={showSetting} close={handleCloseSetting} />
    </Layout>
  );
};

export default Home;
