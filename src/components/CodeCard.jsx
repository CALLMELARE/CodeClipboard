import { Button, Notification, Tag, Modal } from "@douyinfe/semi-ui";
import { IconCopy } from "@douyinfe/semi-icons";
import copy from "copy-to-clipboard";
import { languages } from "../utils/constant";
import { useState } from "react";
import CodeEdit from "./CodeEdit";

const CodeCard = ({ title, content, updated, created, locked, language }) => {
  const [showEdit, setShowEdit] = useState(false);

  const lang = languages[language];

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
    setShowEdit(false);
  };

  const onSave = () => {
    onClose();
  };

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const copyToClipboard = (data) => {
    copy(data);
    const thumbnail = data.length > 40 ? data.substring(0, 37) + "..." : data;
    Notification.success({
      title: "复制成功",
      content: thumbnail,
      duration: 2,
    });
  };

  return (
    <>
      <div className="cc-card">
        <div className="header">
          <span className="title">
            {title}
            <Tag
              style={{
                backgroundColor: lang.bgColor,
                color: lang.color,
                marginLeft: "8px",
              }}
              size="small"
            >
              {language}
            </Tag>
          </span>
          <span className="func">
            <Button
              theme="borderless"
              icon={<IconCopy style={{ color: "#a9a9a9" }} />}
              onClick={copyToClipboard.bind(null, content)}
            ></Button>
          </span>
        </div>
        <div className="content" onClick={handleShowEdit}>
          {content}
        </div>
      </div>
      {showEdit ? (
        <Modal
          title={`正在编辑：${title}`}
          visible={showEdit}
          onCancel={onClose}
          closeOnEsc={true}
          footer={customFooter()}
        >
          <CodeEdit />
        </Modal>
      ) : null}
    </>
  );
};

export default CodeCard;
