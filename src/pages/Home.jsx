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
import CodeHelp from "../components/CodeHelp";
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
  const [showHelp, setShowHelp] = useState(false);

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

  const CustomEmpty = () => {
    return (
      <Empty
        image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
        title="空空如也"
      >
        <Button
          onClick={() => setShowAdd(true)}
          style={{ padding: "6px 24px" }}
          icon={<IconPlus />}
          theme="solid"
          type="primary"
        >
          创建片段
        </Button>
        <Button
          onClick={() => setShowHelp(true)}
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
            onClick={() => setShowAdd(true)}
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
            onClick={() => setShowSetting(true)}
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
      <CodeEdit visible={showAdd} close={() => setShowAdd(false)} />
      <CodeSettings visible={showSetting} close={() => setShowSetting(false)} />
      <CodeHelp visible={showHelp} close={() => setShowHelp(false)} />
    </Layout>
  );
};

export default Home;
