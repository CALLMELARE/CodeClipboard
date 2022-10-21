import { Typography } from "@douyinfe/semi-ui";

const CodeOS = () => {
  const { Text, Paragraph } = Typography;
  return (
    <div style={{ margin: "8px" }}>
      <Paragraph>此站点主要基于以下开源软件：</Paragraph>
      <Text link={{ href: "https://zh-hans.reactjs.org/" }}>React.js</Text>
      <Text
        style={{ marginLeft: "8px" }}
        link={{ href: "http://semi.design/" }}
      >
        Semi-Design
      </Text>
      <Text
        style={{ marginLeft: "8px" }}
        link={{ href: "https://github.com/LiosK/UUID.js" }}
      >
        UUID.js
      </Text>
      <Text
        style={{ marginLeft: "8px" }}
        link={{ href: "https://github.com/sudodoki/copy-to-clipboard" }}
      >
        copy-to-clipboard
      </Text>
    </div>
  );
};
export default CodeOS;
