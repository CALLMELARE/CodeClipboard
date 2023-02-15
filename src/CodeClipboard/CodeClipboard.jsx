import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Layout, Progress, Dropdown } from "@douyinfe/semi-ui";
import {
  IconServer,
  IconSetting,
  IconPlus,
  IconHelpCircle,
  IconSearch,
} from "@douyinfe/semi-icons";
import { sizeFormat } from "../utils/storage";
import CodeHelp from "./info/CodeHelp";
import CodeMatrix from "./components/CodeMatrix";
import CodeEdit from "./components/CodeEdit";
import CodeSettings from "./components/CodeSettings";
import {
  getAllConfig,
  toggleSettingDrawerVisible,
} from "./store/codeSetting.store";
import { toggleHelpDrawerVisible } from "./store/codeHelp.store";
import {
  generateTitle,
  initItemData,
  toggleEditModalVisible,
} from "./store/codeEdit.store";
import { changeKeyword } from "./store/storage.store";
import { NavLink } from "react-router-dom";

const { Header, Footer, Content } = Layout;

const CodeClipboard = () => {
  // store
  const { enableTitle, titleFormat, defaultType } = useSelector(
    (s) => s.setting.config
  );
  const { maxVolumn, used } = useSelector((s) => s.storage.info);
  const { dataSource } = useSelector((s) => s.storage);
  const dispatch = useDispatch();

  return (
    <Layout>
      <Header className="cc-header">
        <Dropdown
          trigger={"hover"}
          position={"bottomLeft"}
          render={
            <Dropdown.Menu>
              <Dropdown.Item>
                <NavLink to="converter" className={"navlink"}>
                  Text Converter
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <span className="logo">Code Clipboard</span>
        </Dropdown>
        <span className="func">
          {dataSource && dataSource.length ? (
            <Input
              suffix={<IconSearch />}
              onChange={(v) => {
                dispatch(changeKeyword({ keyword: v }));
              }}
              style={{ marginRight: "8px", width: "fit-content" }}
            ></Input>
          ) : null}
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

export default CodeClipboard;
