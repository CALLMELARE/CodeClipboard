import { Empty } from "@douyinfe/semi-ui";
import { useSelector } from "react-redux";
import { parse } from "../utils/compiler";
import CodeEmpty from "./CodeEmpty";
import CodeCard from "./CodeCard";

const CodeMatrix = () => {
  const { listType } = useSelector((s) => s.setting.config);
  const { keyword, searchResults } = useSelector((s) => s.storage.search);
  const { dataSource } = useSelector((s) => s.storage);

  const renderCards = (data) => {
    return (
      data &&
      data.map((item, index) => {
        return <CodeCard key={index} {...parse(item)} />;
      })
    );
  };

  const Cols = (listType) => {
    switch (listType) {
      case "single":
        return { cc: 1 };
      case "double":
        return { cc: 2 };
      case "triple":
        return { cc: 3 };
      case "quadra":
        return { cc: 4 };
      default:
        break;
    }
  };

  return (
    <>
      {dataSource && dataSource.length ? (
        <div style={{ columnCount: Cols(listType).cc, columnGap: "16px" }}>
          {keyword
            ? searchResults.length
              ? renderCards(searchResults)
              : null
            : renderCards(dataSource)}
        </div>
      ) : (
        <CodeEmpty />
      )}
      {keyword && !searchResults.length && (
        <Empty
          title="暂未找到匹配的筛选结果"
          description={`"${keyword}"`}
        ></Empty>
      )}
    </>
  );
};

export default CodeMatrix;
