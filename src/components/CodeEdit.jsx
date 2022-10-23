import { Form, Modal, Button, Typography, Select } from "@douyinfe/semi-ui";
import {
  IconDelete,
  IconSave,
  IconClose,
  IconMinimize,
  IconMaximize,
  IconText,
  IconCode,
} from "@douyinfe/semi-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  saveItemData,
  toggleFullScreen,
  changeContentType,
  changeFormData,
  deleteItemData,
  toggleEditModalVisible,
  resetItemData,
} from "../store/codeEdit.store";
import KeyboardEventHandler from "react-keyboard-event-handler";
import Icon from "../icons";
import { languages } from "../utils/constant";
import { updateDataSource, updateUsedVolumn } from "../store/storage.store";

const CodeEdit = () => {
  // store
  const { id, title, type, content, language, locked } = useSelector(
    (s) => s.edit.data
  );
  const { enableGenerateTitle, generateTitleFormat } = useSelector(
    (s) => s.setting.config
  );
  const { fullScreen } = useSelector((s) => s.edit.behavior);
  const { editModalVisible } = useSelector((s) => s.edit.behavior);
  const dispatch = useDispatch();

  const customHeader = () => {
    const { Title } = Typography;
    return (
      <div
        style={{
          margin: "24px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Title
          heading={5}
          ellipsis={{ showTooltip: true }}
          style={{ lineHeight: "32px" }}
        >
          {id ? `正在编辑：${title}` : "创建"}
        </Title>
        <span style={{ display: "flex", marginLeft: "16px" }}>
          <Select
            disabled={id ? true : false}
            defaultValue={type}
            onChange={(v) => {
              dispatch(
                changeContentType({
                  type: v,
                })
              );
            }}
          >
            <Select.Option
              value="text"
              key="text"
              showTick={false}
              label={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <IconText style={{ marginRight: "8px" }} />
                  文本
                </span>
              }
            ></Select.Option>
            <Select.Option
              value="code"
              key="code"
              showTick={false}
              label={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <IconCode style={{ marginRight: "8px" }} />
                  代码
                </span>
              }
            ></Select.Option>
          </Select>

          <Button
            key="fullscreen"
            style={{ marginLeft: "8px" }}
            type="tertiary"
            theme="borderless"
            icon={fullScreen ? <IconMinimize /> : <IconMaximize />}
            onClick={() => {
              dispatch(toggleFullScreen());
            }}
          ></Button>
          <Button
            style={{ marginLeft: "8px" }}
            key="close"
            type="tertiary"
            icon={<IconClose />}
            onClick={() => {
              dispatch(resetItemData());
              dispatch(toggleEditModalVisible());
            }}
          ></Button>
        </span>
      </div>
    );
  };

  const customFooter = () => {
    let btns = [];
    const cancel = (
      <Button
        key="cancel"
        type="tertiary"
        theme="borderless"
        onClick={() => {
          dispatch(resetItemData());
          dispatch(toggleEditModalVisible());
        }}
        icon={<IconClose />}
      >
        取消
      </Button>
    );
    const del = (
      <Button
        key="del"
        type="danger"
        theme="borderless"
        onClick={() => {
          dispatch(deleteItemData());
          dispatch(resetItemData());
          dispatch(updateDataSource());
          dispatch(updateUsedVolumn());
          dispatch(toggleEditModalVisible());
        }}
        icon={<IconDelete />}
        style={{ position: "absolute", left: "8px" }}
      >
        删除
      </Button>
    );
    const save = (
      <Button
        key="save"
        theme="borderless"
        onClick={() => {
          dispatch(saveItemData());
          dispatch(updateDataSource());
          dispatch(updateUsedVolumn());
          dispatch(resetItemData());
          dispatch(toggleEditModalVisible());
        }}
        icon={<IconSave />}
      >
        保存
      </Button>
    );
    id && btns.push(del);
    btns.push(cancel);
    btns.push(save);

    return btns;
  };

  return (
    <Modal
      visible={editModalVisible}
      onCancel={() => {
        dispatch(toggleEditModalVisible());
      }}
      closeOnEsc={true}
      fullScreen={fullScreen}
      header={customHeader()}
      footer={customFooter()}
      size="large"
    >
      <KeyboardEventHandler
        handleKeys={["ctrl+s"]}
        onKeyEvent={(key, e) => {
          e.preventDefault();
          if (key === "ctrl+s") {
            dispatch(saveItemData());
            dispatch(updateDataSource());
            dispatch(updateUsedVolumn());
            dispatch(resetItemData());
            dispatch(toggleEditModalVisible());
          }
        }}
      >
        <Form
          onValueChange={(v) => {
            dispatch(
              changeFormData({
                ...v,
              })
            );
          }}
          initValues={{
            title,
            content,
            language,
            locked,
          }}
        >
          <Form.Input
            field="title"
            disabled={locked}
            showClear
            label="标题"
            maxLength={30}
          />
          {type === "code" && (
            <Form.Select
              field="language"
              label="语言/格式"
              filter
              disabled={locked}
              placeholder={`支持${languages.length}种编程语言/格式`}
              style={{ width: "100%" }}
            >
              {languages.map((value, index) => {
                return (
                  <Form.Select.Option
                    showTick={false}
                    value={value.label}
                    key={value.label}
                  >
                    <Icon src={value.icon} style={{ marginRight: "8px" }} />
                    {value.label}
                  </Form.Select.Option>
                );
              })}
            </Form.Select>
          )}
          <Form.TextArea
            field="content"
            label="内容"
            disabled={locked}
            showClear
            maxCount={99999}
            style={{ ovserflowY: "auto",height: "fit-content" }}
          ></Form.TextArea>
          {id ? <Form.Switch field="locked" label="锁定" /> : null}
        </Form>
      </KeyboardEventHandler>
    </Modal>
  );
};

export default CodeEdit;
