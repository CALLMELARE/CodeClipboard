import { SideSheet } from "@douyinfe/semi-ui";

const CodeHelp = (props) => {
  return (
    <SideSheet
      title="指南"
      visible={props.visible}
      onCancel={() => {
        props.close();
      }}
    >
      
    </SideSheet>
  );
};

export default CodeHelp;
