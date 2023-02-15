import { useEffect, useState } from "react";

import { Layout, Dropdown } from "@douyinfe/semi-ui";
import {} from "@douyinfe/semi-icons";

const { Header, Footer, Content } = Layout;

const CodeClipboard = () => {
  return (
    <Layout>
      <Header className="cc-header">
        <Dropdown
          trigger={"hover"}
          position={"bottomLeft"}
          render={
            <Dropdown.Menu>
              <Dropdown.Item>Code Clipboard</Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <span className="logo">Text Converter</span>
        </Dropdown>
        <span className="func"></span>
      </Header>
      <Content style={{ padding: "16px" }}></Content>
      <Footer className="cc-footer"></Footer>
    </Layout>
  );
};

export default CodeClipboard;
