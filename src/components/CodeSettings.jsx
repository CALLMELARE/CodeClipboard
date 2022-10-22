import {
  Form,
  SideSheet,
  Button,
  Toast,
  Popconfirm,
  Collapsible,
} from "@douyinfe/semi-ui";
import {
  IconDelete,
  IconGithubLogo,
  IconInfoCircle,
  IconText,
  IconCode,
} from "@douyinfe/semi-icons";
import { useSelector, useDispatch } from "react-redux";
import CodeOS from "../info/CodeOS";
import {
  deleteAllData,
  setAllConfig,
  toggleSettingDrawerVisible,
  toggleSettingOSVisible,
} from "../store/codeSetting.store";

const CodeSettings = () => {
  // store
  const { settingDrawerVisible, settingOSVisible } = useSelector(
    (s) => s.setting.behavior
  );
  const config = useSelector((s) => s.setting.config);
  const dispatch = useDispatch();

  return (
    <SideSheet
      title="设置"
      visible={settingDrawerVisible}
      onCancel={() => {
        dispatch(toggleSettingDrawerVisible());
      }}
    >
      <div style={{ position: "relative", paddingBottom: "30px" }}>
        <Form
          onValueChange={(v) => {
            dispatch(
              setAllConfig({
                ...v,
              })
            );
          }}
          initValues={config}
        >
          <Form.RadioGroup field="listType" type="button" label="列表风格">
            <Form.Radio value="single">单列</Form.Radio>
            <Form.Radio value="double">双列</Form.Radio>
            <Form.Radio value="triple">三列</Form.Radio>
          </Form.RadioGroup>

          <Form.RadioGroup
            field="defaultType"
            type="button"
            label="默认片段类型"
          >
            <Form.Radio value="text">
              <span style={{ display: "flex", alignItems: "center" }}>
                <IconText style={{ marginRight: "8px" }} />
                文本
              </span>
            </Form.Radio>
            <Form.Radio value="code">
              <span style={{ display: "flex", alignItems: "center" }}>
                <IconCode style={{ marginRight: "8px" }} />
                代码
              </span>
            </Form.Radio>
          </Form.RadioGroup>

          <Form.Switch field="enableTitle" label="自动生成标题"></Form.Switch>

          <Form.Input
            showClear
            field="titleFormat"
            label="标题格式"
            disabled={!config.enableTitle}
            suffix={
              <Button
                icon={<IconInfoCircle />}
                onClick={() => {
                  window.open("https://day.js.org/docs/en/display/format");
                }}
              ></Button>
            }
          ></Form.Input>

          <Form.Slot label="数据管理">
            <Popconfirm
              title="确定是否清空数据"
              content="此操作不可逆"
              onConfirm={() => {
                dispatch(deleteAllData());
              }}
            >
              <Button type="danger" icon={<IconDelete />}>
                清除数据
              </Button>
            </Popconfirm>
          </Form.Slot>

          <Form.Slot label="关于">
            <Button
              onClick={() => {
                window.open("https://github.com/CALLMELARE/CodeClipboard");
              }}
              icon={<IconGithubLogo />}
              type="tertiary"
            >
              Github
            </Button>
            <Button
              onClick={() => {
                dispatch(toggleSettingOSVisible());
              }}
              style={{ marginLeft: "8px" }}
              type="tertiary"
            >
              开源软件
            </Button>
            <Collapsible isOpen={settingOSVisible}>
              <CodeOS />
            </Collapsible>
          </Form.Slot>
        </Form>
        <div
          style={{
            textAlign: "center",
            width: "100%",
            color: "#d9d9d9",
            fontSize: "10px",
            padding: "16px 0",
          }}
        >
          Code Clipboard by LARE
        </div>
      </div>
    </SideSheet>
  );
};

export default CodeSettings;
