import { Form, Modal, Button } from "@douyinfe/semi-ui";
import { useState } from "react";
import { create, modify } from "../utils/code";

const CodeEdit = (props) => {
  const [data, setData] = useState(props);
  const handleChange = (value) => {
    setData((prev) => ({ ...prev, ...value }));
  };

  const customFooter = () => {
    let btns = [];
    const cancel = (
      <Button type="tertiary" theme="borderless" onClick={onClose}>
        取消
      </Button>
    );
    const save = (
      <Button theme="borderless" onClick={onSave}>
        保存
      </Button>
    );
    btns.push(cancel);
    btns.push(save);

    return btns;
  };

  const onClose = () => {
    props.close();
  };

  const onSave = (data) => {
    save();
    onClose();
  };

  const save = () => {
    if (!props.id) {
      // 新增
      create(data);
    } else {
      // 修改
      modify(data);
    }
  };

  return (
    <Modal
      title={props.id ? `正在编辑：${props.title}` : "创建"}
      visible={props.visible}
      onCancel={onClose}
      closeOnEsc={true}
      footer={customFooter()}
    >
      <Form onValueChange={handleChange} initValues={props}>
        <Form.Input field="title" showClear label="标题" />
        <Form.TextArea field="content" label="内容" />
        <Form.Switch field="locked" label="锁定" />
      </Form>
    </Modal>
  );
};

export default CodeEdit;
