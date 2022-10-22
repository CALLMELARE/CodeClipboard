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
import { updateDataSource, updateUsedVolumn } from "../store/storage.store";

const { Header, Footer, Content } = Layout;

const Home = () => {
  // store
  const { enableTitle, titleFormat, defaultType } = useSelector(
    (s) => s.setting.config
  );
  const { maxVolumn, used, firstLoad } = useSelector((s) => s.storage.info);
  const { dataSource } = useSelector((s) => s.storage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!firstLoad) {
      dispatch(updateDataSource());
      dispatch(updateUsedVolumn());
    }
  }, [firstLoad, dispatch]);

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
          <Progress
            className="progress"
            size="large"
            percent={(used / maxVolumn) * 100}
          />
          <span className="info">
            {sizeFormat(used)} / {sizeFormat(maxVolumn)}
          </span>
          {dataSource && dataSource.length ? (
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
        <CodeMatrix key="matrix" dataSource={dataSource} />
      </Content>
      <Footer className="cc-footer"></Footer>
      <CodeEdit />
      <CodeSettings />
      <CodeHelp />
    </Layout>
  );
};

export default Home;
