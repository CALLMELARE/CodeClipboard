import { Form, SideSheet, Button, Notification } from "@douyinfe/semi-ui";
import { IconDelete } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import { getAllCfg, setCfg } from "../utils/setting";
import { getLocalStorage, setLocalStorage } from "../utils/storage";

const CodeSettings = (props) => {
  const [config, setConfig] = useState();
  useEffect(() => {
    getAllCfg().then((res) => {
      setConfig(res);
    });
  }, [props]);

  const handleChange = (value) => {
    const { listType, mode } = value;

    listType && setCfg("listType", listType);
    mode && switchMode(mode);
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
    Notification.success({
      title: "清空成功",
      content: "已清空全部数据",
      duration: 2,
    });
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
          <Form.Slot label="数据管理">
            <Button
              type="danger"
              icon={<IconDelete />}
              onClick={clearCodeData}
            >
              清除数据
            </Button>
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
