import { Empty, Button } from "@douyinfe/semi-ui";
import { IconPlus } from "@douyinfe/semi-icons";
import { IllustrationNoResult } from "@douyinfe/semi-illustrations";
import { useSelector, useDispatch } from "react-redux";
import {
  generateTitle,
  initItemData,
  toggleEditModalVisible,
} from "../store/codeEdit.store";
import { toggleHelpDrawerVisible } from "../store/codeHelp.store";

const CodeEmpty = () => {
  // store
  const { enableTitle, titleFormat, defaultType } = useSelector(
    (s) => s.setting.config
  );
  const dispatch = useDispatch();

  return (
    <Empty
      image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
      title="空空如也"
    >
      <Button
        onClick={() => {
          dispatch(initItemData({ type: defaultType }));
          if (enableTitle) {
            dispatch(generateTitle({ titleFormat }));
          }
          dispatch(toggleEditModalVisible());
        }}
        style={{ padding: "6px 24px" }}
        icon={<IconPlus />}
        theme="solid"
        type="primary"
      >
        创建片段
      </Button>
      <Button
        onClick={() => {
          dispatch(toggleHelpDrawerVisible());
        }}
        style={{ marginLeft: "8px", padding: "6px 24px", marginRight: 12 }}
        type="primary"
      >
        阅读指南
      </Button>
    </Empty>
  );
};

export default CodeEmpty;
