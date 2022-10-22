import {
  useFormApi,
  Form,
  Modal,
  Button,
  Toast,
  Typography,
  Select,
} from "@douyinfe/semi-ui";
import {
  IconDelete,
  IconSave,
  IconClose,
  IconMinimize,
  IconMaximize,
  IconText,
  IconCode,
} from "@douyinfe/semi-icons";
import { useEffect, useRef, useState } from "react";
import { create, modify, remove } from "../utils/code";
import dayjs from "dayjs";
import { getLocalStorage } from "../utils/storage";
import KeyboardEventHandler from "react-keyboard-event-handler";
import Icon from "../icons";
import { languages } from "../utils/constant";

const CodeEdit = (props) => {
  const [data, setData] = useState({ ...props });
  const [full, setFull] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const t = getLocalStorage("config").defaultType;
    setData((p) => ({ ...p, type: t }));
  }, [props.visible]);

  useEffect(() => {}, [data.content]);

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
            disabled={props.id ? true : false}
            defaultValue={
              props.type ? props.type : getLocalStorage("config").defaultType
            }
            onChange={handleTypeChange}
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
            ></Select.Option>{" "}
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
      <KeyboardEventHandler
        handleKeys={["ctrl+s", "enter"]}
        onKeyEvent={(key, e) => {
          e.preventDefault();
          if (key === "ctrl+s" || key === "enter") {
            onSave();
          }
        }}
      >
        <Form
          onValueChange={handleChange}
          initValues={{
            ...props,
            title: props.title ? props.title : genTitle.bind(null),
          }}
        >
          <Form.Input
            field="title"
            disabled={data.locked}
            showClear
            label="标题"
            maxLength={30}
            autofocus
          />
          {data.type === "code" && (
            <Form.Select
              field="language"
              label="语言"
              filter
              placeholder="支持10种语言"
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
            disabled={data.locked}
            showClear
            autosize
            maxCount={99999}
            ref={inputRef}
          ></Form.TextArea>
          <Form.Switch field="locked" label="锁定" />
        </Form>
      </KeyboardEventHandler>
    </Modal>
  );
};

export default CodeEdit;
