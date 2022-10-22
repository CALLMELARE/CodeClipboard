import {
  useFormApi,
  Form,
  Modal,
  Button,
  Toast,
  Typography,
  useFieldApi,
  RadioGroup,
  Radio,
  Select,
} from "@douyinfe/semi-ui";
import {
  IconDelete,
  IconSave,
  IconClose,
  IconMinimize,
  IconMaximize,
  IconClock,
  IconText,
  IconCode,
} from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import { create, modify, remove } from "../utils/code";
import dayjs from "dayjs";
import { getCfg } from "../utils/setting";
import { getLocalStorage } from "../utils/storage";

const CodeEdit = (props) => {
  const [data, setData] = useState({ ...props });
  const [full, setFull] = useState(false);

  const genTitle = () => {
    const cfg = getLocalStorage("config");
    const enable = cfg && cfg.enableTitle;
    const f = cfg && cfg.titleFormat;
    const t = enable
      ? dayjs(Date.now()).format(f || "[CodeSnippet]_YYYYMMDD_HH:mm:ss")
      : "";
    setData((p) => ({ ...p, title: t }));
    return t;
  };

  const defaultType = () => {};

  const handleTypeChange = (value) => {
    console.log(value);
    setData((p) => ({ ...p, type: value }));
  };

  const handleChange = (value) => {
    console.log(data);
    setData((prev) => ({ ...prev, ...value }));
  };

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
          {props.id ? `正在编辑：${props.title}` : "创建"}
        </Title>
        <span style={{ display: "flex", marginLeft: "16px" }}>
          <Select
            disabled={props.id}
            defaultValue={props.type}
            onChange={handleTypeChange}
          >
            <Select.Option
              value="text"
              showTick={false}
              label={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <IconText style={{ marginRight: "8px" }} />
                  文本
                </span>
              }
            ></Select.Option>{" "}
            <Select.Option
              value="code"
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
            icon={full ? <IconMinimize /> : <IconMaximize />}
            onClick={() => {
              setFull(!full);
            }}
          ></Button>
          <Button
            style={{ marginLeft: "8px" }}
            key="close"
            type="tertiary"
            icon={<IconClose />}
            onClick={onClose}
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
        onClick={onClose}
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
        onClick={onDel}
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
        onClick={onSave}
        icon={<IconSave />}
      >
        保存
      </Button>
    );
    btns.push(del);
    btns.push(cancel);
    btns.push(save);

    return btns;
  };

  const onClose = () => {
    props.close();
  };

  const onSave = () => {
    save();
    onClose();
  };

  const save = () => {
    if (!props.id) {
      // 新增
      create(data).then((res) => {
        Toast.success(res);
      });
      setData({});
    } else {
      // 修改
      modify(data).then((res) => {
        Toast.success(res);
      });
      setData({});
    }
  };

  const onDel = () => {
    remove(data)
      .then((res) => {
        Toast.success(res);
      })
      .catch((err) => {
        Toast.error(err);
      });
  };

  const typeSwitch = () => {};

  return (
    <Modal
      visible={props.visible}
      onCancel={onClose}
      closeOnEsc={true}
      fullScreen={full}
      header={customHeader()}
      footer={customFooter()}
    >
      <Form
        onValueChange={handleChange}
        initValues={{
          ...props,
          title: props.title ? props.title : genTitle.bind(null),
        }}
      >
        <Form.Input field="title" showClear label="标题" maxLength={30} />
        <Form.TextArea
          field="content"
          label="内容"
          showClear
          autosize
          maxCount={99999}
        />
        {/* <Form.Switch field="locked" label="锁定" /> */}
      </Form>
    </Modal>
  );
};

export default CodeEdit;
