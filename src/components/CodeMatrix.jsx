import {} from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { parse } from "../utils/compiler";
import CodeEmpty from "./CodeEmpty";
import CodeCard from "./CodeCard";

const CodeMatrix = ({ dataSource }) => {
  const { listType } = useSelector((s) => s.setting.config);

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
        <div style={{ columnCount: Cols(listType).cc }}>{renderCards(dataSource)}</div>
      ) : (
        <CodeEmpty />
      )}
    </>
  );
};

export default CodeMatrix;
