import { useEffect, useState } from "react";

import { Layout, Dropdown } from "@douyinfe/semi-ui";
import {} from "@douyinfe/semi-icons";
import { NavLink } from "react-router-dom";

const { Header, Footer, Content } = Layout;

const TextConverter = () => {
  return (
    <Layout>
      <Header className="cc-header">
        <Dropdown
          trigger={"hover"}
          position={"bottomLeft"}
          render={
            <Dropdown.Menu>
              <Dropdown.Item>
                <NavLink to="/" className={"navlink"}>
                  Code Clipboard
                </NavLink>
              </Dropdown.Item>
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

export default TextConverter;
