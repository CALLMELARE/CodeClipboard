import { SideSheet, Typography } from "@douyinfe/semi-ui";
import { IconPlus, IconSetting, IconCopy } from "@douyinfe/semi-icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleHelpDrawerVisible } from "../store/codeHelp.store";

const CodeHelp = () => {
  // store
  const { helpDrawerVisible } = useSelector((s) => s.help.behavior);
  const dispatch = useDispatch();

  const { Title, Paragraph } = Typography;
  return (
    <SideSheet
      title="指南"
      visible={helpDrawerVisible}
      onCancel={() => {
        dispatch(toggleHelpDrawerVisible());
      }}
    >
      <Title heading={5} style={{ margin: "8px 0" }}>
        这是啥？
      </Title>
      <Paragraph>
        这是一个代码剪贴板，你可以在此存储一些代码片段，并方便地拷贝它们。
      </Paragraph>
      <Paragraph>这在你开发中遇到多个需要复用的代码片段时有所帮助。</Paragraph>
      <Title heading={5} style={{ margin: "8px 0" }}>
        怎么用？
      </Title>
      <Paragraph>
        点<IconPlus />
        创建代码片段，之后它便会出现在列表中。
      </Paragraph>
      <Paragraph>按下【Ctrl+S】或【Enter】即可保存</Paragraph>
      <Paragraph>
        点<IconCopy />
        复制代码片段，代码内容会复制至你的粘贴板供你使用。
      </Paragraph>
      <Paragraph>
        点<IconSetting />
        进行设置，调整到你最舒服的姿势。
      </Paragraph>
      <Title heading={5} style={{ margin: "8px 0" }}>
        数据存在哪里？
      </Title>
      <Paragraph>
        所有的代码数据都在浏览器中，没有一个字节会被上传至网络。
      </Paragraph>
      <Paragraph>
        试着按下【F12】，切换到【应用程序】-&gt;【本地存储】，它们就在那里，一个也不少。
      </Paragraph>
      <Title heading={5} style={{ margin: "8px 0" }}>
        为什么存储上限是5MB？
      </Title>
      <Paragraph>
        这是浏览器对于本地存储的限制，未来可能会引入indexedDB以打破这一限制。
      </Paragraph>
      <Title heading={5} style={{ margin: "8px 0" }}>
        数据如何迁移？
      </Title>
      <Paragraph>导出和导入是计划中支持的功能。</Paragraph>
    </SideSheet>
  );
};

export default CodeHelp;
