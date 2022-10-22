import { Typography } from "@douyinfe/semi-ui";

const CodeOS = () => {
  const { Text, Paragraph } = Typography;
  return (
    <div style={{ margin: "8px", display: "flex", flexDirection: "column" }}>
      <Paragraph>此站点主要基于以下开源软件：</Paragraph>
      <Text link={{ href: "https://github.com/facebook/react" }}>React.js</Text>
      <Text link={{ href: "https://github.com/reduxjs/redux" }}>Redux</Text>
      <Text link={{ href: "https://github.com/reduxjs/react-redux" }}>
        React Redux
      </Text>
      <Text link={{ href: "https://github.com/DouyinFE/semi-design" }}>Semi-Design</Text>
      <Text link={{ href: "https://github.com/LiosK/UUID.js" }}>UUID.js</Text>
      <Text link={{ href: "https://github.com/sudodoki/copy-to-clipboard" }}>
        copy-to-clipboard
      </Text>
      <Text link={{ href: "https://github.com/iamkun/dayjs" }}>Day.js</Text>
      <Text
        link={{
          href: "https://github.com/linsight/react-keyboard-event-handler",
        }}
      >
        react-keyboard-event-handler
      </Text>
      <Text link={{ href: "https://github.com/highlightjs/highlight.js" }}>highlight.js</Text>
      <Paragraph>使用开源字体：</Paragraph>
      <Text link={{ href: "https://github.com/JetBrains/JetBrainsMono" }}>
        JetBrainsMono
      </Text>
    </div>
  );
};
export default CodeOS;
