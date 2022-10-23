import {
  Button,
  Notification,
  Tag,
  Modal,
  Typography,
} from "@douyinfe/semi-ui";
import { IconCopy, IconText, IconCode } from "@douyinfe/semi-icons";
import copy from "copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import CodeHighlight from "./CodeHighlight";
import { initItemData, toggleEditModalVisible } from "../store/codeEdit.store";
import { highlightKeyword } from "../utils/highlighter";

const CodeCard = ({
  id,
  title,
  content,
  updated,
  created,
  locked,
  language,
  type,
}) => {
  const { Title, Text } = Typography;

  // store
  const {} = useSelector((s) => s.setting.config);
  const { keyword } = useSelector((s) => s.storage.search);
  const dispatch = useDispatch();

  const copyToClipboard = (data) => {
    if (data) {
      copy(data);
      const thumbnail = data.length > 30 ? data.substring(0, 27) + "..." : data;
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
    <div className="cc-card">
      <div className="header">
        <span
          className="title"
          onClick={() => {
            dispatch(
              initItemData({
                id,
                title,
                content,
                updated,
                created,
                locked,
                language,
                type,
              })
            );
            dispatch(toggleEditModalVisible());
          }}
        >
          <Title
            heading={5}
            ellipsis={{ showTooltip: true }}
            style={{
              lineHeight: "32px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {type === "text" ? (
              <IconText style={{ marginRight: "8px" }} />
            ) : null}
            {type === "code" ? (
              <IconCode style={{ marginRight: "8px" }} />
            ) : null}
            {keyword &&
            title.toLocaleUpperCase().includes(keyword.toLocaleUpperCase()) ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightKeyword(title, keyword),
                }}
              ></span>
            ) : (
              title
            )}
          </Title>
        </span>
        <span className="func">
          <Button
            theme="borderless"
            icon={<IconCopy style={{ color: "#a9a9a9" }} />}
            onClick={copyToClipboard.bind(null, content)}
          ></Button>
        </span>
      </div>
      <div className="content">
        {type === "code" && (
          <CodeHighlight language={language} content={content} />
        )}
        {type === "text" && (
          <pre
            style={{
              fontFamily: "JetBrainsMono",
              fontSize: "14px",
            }}
          >
            {content}
          </pre>
        )}
      </div>
      <div className="footer">{language ? language : "文本"}</div>
    </div>
  );
};

export default CodeCard;
