import { Form, Modal, Button, Toast } from "@douyinfe/semi-ui";
import { IconDelete, IconSave, IconClose } from "@douyinfe/semi-icons";
import { useState } from "react";
import { create, modify, remove } from "../utils/code";

const CodeEdit = (props) => {
  const [data, setData] = useState(props);
  const handleChange = (value) => {
    setData((prev) => ({ ...prev, ...value }));
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
    remove(data).then((res)=>{
      Toast.success(res);
    }).catch((err)=>{
      Toast.error(err);
    })
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
