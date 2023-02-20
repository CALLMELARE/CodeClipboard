import { Notification } from "@douyinfe/semi-ui";
import copy from "copy-to-clipboard";

const ResultCard = ({ label, text }) => {
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
    <div className="tc-result-card" onClick={copyToClipboard.bind(null, text)}>
      <div className="tc-result-card-label">{label}</div>
      <div className="tc-result-card-text">{text}</div>
    </div>
  );
};

export default ResultCard;
