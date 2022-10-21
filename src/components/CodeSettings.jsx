import { Form, SideSheet } from "@douyinfe/semi-ui";
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
    const { listType } = value;
    console.log(value);
    listType && setConfig(value);
    listType && setCfg("listType", listType);
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
          <Form.RadioGroup field="listType" type="button" label="列表风格">
            <Form.Radio value="single">单列</Form.Radio>
            <Form.Radio value="double">双列</Form.Radio>
            <Form.Radio value="triple">三列</Form.Radio>
          </Form.RadioGroup>
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
