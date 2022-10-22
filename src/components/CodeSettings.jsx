import {
  Form,
  SideSheet,
  Button,
  Toast,
  Popconfirm,
  Collapsible,
  Banner,
  Spin,
} from "@douyinfe/semi-ui";
import {
  IconDelete,
  IconGithubLogo,
  IconInfoCircle,
  IconText,
  IconCode,
  IconRefresh,
} from "@douyinfe/semi-icons";
import { useSelector, useDispatch } from "react-redux";
import CodeOS from "../info/CodeOS";
import {
  deleteAllData,
  setAllConfig,
  toggleSettingDrawerVisible,
  toggleSettingOSVisible,
} from "../store/codeSetting.store";
import {
  updateDataSource,
  updateMaxVolumn,
  updateUsedVolumn,
} from "../store/storage.store";

const CodeSettings = () => {
  // store
  const { settingDrawerVisible, settingOSVisible } = useSelector(
    (s) => s.setting.behavior
  );
  const { isTesting } = useSelector((s) => s.storage.behavior);
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
        {isTesting ? (
          <Banner type="info" icon={<Spin />} title="正在测试中..." />
        ) : null}
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
              title="是否开始测试"
              content="此过程会持续数十秒"
              onConfirm={() => {
                dispatch(updateMaxVolumn());
              }}
            >
              <Button type="danger" icon={<IconRefresh />}>
                测试存储最大容量
              </Button>
            </Popconfirm>
            <Popconfirm
              title="是否清空数据"
              content="此操作不可逆"
              onConfirm={() => {
                dispatch(deleteAllData());
                dispatch(updateDataSource());
                dispatch(updateUsedVolumn());
              }}
            >
              <Button
                type="danger"
                style={{ marginLeft: "8px" }}
                icon={<IconDelete />}
              >
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
