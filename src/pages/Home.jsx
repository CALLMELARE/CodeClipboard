import { Empty, Button, Layout, Progress } from "@douyinfe/semi-ui";
import {
  IconServer,
  IconSetting,
  IconPlus,
  IconHelpCircle,
} from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import {
  getLocalStorageVolume,
  getLocalStorage,
  sizeFormat,
} from "../utils/storage";
import { useSelector, useDispatch } from "react-redux";
import CodeHelp from "../info/CodeHelp";
import CodeMatrix from "../components/CodeMatrix";
import CodeEdit from "../components/CodeEdit";
import CodeSettings from "../components/CodeSettings";
import CodeEmpty from "../components/CodeEmpty";
import {
  getAllConfig,
  toggleSettingDrawerVisible,
} from "../store/codeSetting.store";
import { toggleHelpDrawerVisible } from "../store/codeHelp.store";
import {
  generateTitle,
  initItemData,
  toggleEditModalVisible,
} from "../store/codeEdit.store";

const { Header, Footer, Content } = Layout;

const Home = () => {
  const [percent, setPercent] = useState(0);
  const [used, setUsed] = useState(0);
  const [maxVolumn, setMaxVolumn] = useState(5 * 1024 * 1024);
  const [data, setData] = useState();

  // store
  const { enableTitle, titleFormat, defaultType } = useSelector(
    (s) => s.setting.config
  );
  const dispatch = useDispatch();

  // 更新用量
  setInterval(() => {
    setUsed(getLocalStorageVolume());
  }, 3000);

  useEffect(() => {
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
          <Button
            theme="borderless"
            style={{ marginRight: "8px" }}
            onClick={() => {
              dispatch(initItemData({ type: defaultType }));
              if (enableTitle) {
                dispatch(generateTitle({ titleFormat }));
              }
              dispatch(toggleEditModalVisible());
            }}
            icon={<IconPlus />}
          ></Button>
          <IconServer style={{ marginRight: "8px" }} />
          <Progress className="progress" size="large" percent={percent} />
          <span className="info">
            {sizeFormat(used)} / {sizeFormat(maxVolumn)}
          </span>
          {data && data.length ? (
            <Button
              icon={<IconHelpCircle />}
              onClick={() => {
                dispatch(toggleHelpDrawerVisible());
              }}
              theme="borderless"
            ></Button>
          ) : null}
          <Button
            theme="borderless"
            onClick={() => {
              dispatch(toggleSettingDrawerVisible());
              dispatch(getAllConfig());
            }}
            icon={<IconSetting />}
          ></Button>
        </span>
      </Header>
      <Content style={{ padding: "16px" }}>
        <CodeMatrix
          key="matrix"
          dataSource={data}
          Empty={() => <CodeEmpty />}
        />
      </Content>
      <Footer className="cc-footer"></Footer>
      <CodeEdit />
      <CodeSettings />
      <CodeHelp />
    </Layout>
  );
};

export default Home;
