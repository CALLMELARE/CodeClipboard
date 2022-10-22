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
import { useEffect, useState } from "react";
import { getAllCfg, setCfg } from "../utils/setting";
import { getLocalStorage, setLocalStorage } from "../utils/storage";
import CodeOS from "../info/CodeOS";

const CodeSettings = (props) => {
  const [config, setConfig] = useState(props);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    getAllCfg().then((res) => {
      setConfig(res);
    });
  }, [props]);

  const toggle = () => {
    setOpen(!isOpen);
  };

  const handleChange = (value) => {
    const { listType, mode, titleFormat, enableTitle, defaultType } = value;
    setConfig({ listType, mode, titleFormat, enableTitle });
    listType && setCfg("listType", listType);
    mode && switchMode(mode);
    titleFormat && setCfg("titleFormat", titleFormat);
    setCfg("enableTitle", enableTitle);
    defaultType && setCfg("defaultType", defaultType);
  };

  const switchMode = (mode) => {
    const body = document.body;
    if (mode === "light") {
      body.setAttribute("theme-mode", "light");
      setCfg("mode", "light");
    } else {
      body.setAttribute("theme-mode", "dark");
      setCfg("mode", "dark");
    }
  };

  const clearCodeData = () => {
    setLocalStorage("data", "[]");
    Toast.success("数据已清空");
  };

  return (
    <SideSheet
      title="设置"
      visible={props.visible}
      onCancel={() => {
        props.close();
      }}
    >
      <div style={{ position: "relative", height: "100%" }}>
        <Form onValueChange={handleChange} initValues={config}>
          {/* <Form.RadioGroup field="mode" type="button" label="主题">
            <Form.Radio value="light">亮色</Form.Radio>
            <Form.Radio value="dark">暗色</Form.Radio>
          </Form.RadioGroup> */}

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
              onConfirm={clearCodeData}
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
              onClick={toggle}
              style={{ marginLeft: "8px" }}
              type="tertiary"
            >
              开源软件
            </Button>
            <Collapsible isOpen={isOpen}>
              <CodeOS />
            </Collapsible>
          </Form.Slot>
        </Form>

        <div
          style={{
            position: "absolute",
            bottom: "16px",
            textAlign: "center",
            width: "100%",
            color: "#d9d9d9",
            fontSize: "10px",
          }}
        >
          Code Clipboard by LARE
        </div>
      </div>
    </SideSheet>
  );
};

export default CodeSettings;
