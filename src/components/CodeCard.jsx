import { Button, Notification, Tag, Modal } from "@douyinfe/semi-ui";
import { IconCopy } from "@douyinfe/semi-icons";
import copy from "copy-to-clipboard";
import { languages } from "../utils/constant";
import { useState } from "react";
import CodeEdit from "./CodeEdit";

const CodeCard = ({
  id,
  title,
  content,
  updated,
  created,
  locked,
  language,
}) => {
  const [showEdit, setShowEdit] = useState(false);

  const lang = languages[language];

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const copyToClipboard = (data) => {
    if (data) {
      copy(data);
      const thumbnail = data.length > 20 ? data.substring(0, 17) + "..." : data;
      Notification.success({
        title: "复制成功",
        content: thumbnail,
        duration: 2,
      });
    } else {
      Notification.error({
        title: "复制失败",
        duration: 2,
      });
    }
  };

  return (
    <>
      <div className="cc-card">
        <div className="header">
          <span className="title" onClick={handleShowEdit}>
            {title}
            {/* <Tag
              style={{
                backgroundColor: lang.bgColor,
                color: lang.color,
                marginLeft: "8px",
              }}
              size="small"
            >
              {language}
            </Tag> */}
          </span>
          <span className="func">
            <Button
              theme="borderless"
              icon={<IconCopy style={{ color: "#a9a9a9" }} />}
              onClick={copyToClipboard.bind(null, content)}
            ></Button>
          </span>
        </div>
        <div className="content" >
          {content}
        </div>
      </div>

      <CodeEdit
        visible={showEdit}
        close={handleCloseEdit}
        id={id}
        title={title}
        content={content}
        updated={updated}
        created={created}
        locked={locked}
        language={language}
      />
    </>
  );
};

export default CodeCard;
