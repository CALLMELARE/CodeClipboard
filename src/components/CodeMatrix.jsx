import { useEffect, useState } from "react";
import { parse } from "../utils/compiler";
import CodeCard from "./CodeCard";

const CodeMatrix = ({ dataSource, listType }) => {
  const Cols = (listType) => {
    switch (listType) {
      case "single":
        return "100%";
      case "double":
        return "50% 50%";
      case "triple":
        return "33.33% 33.33% 33.33%";
      default:
        break;
    }
  };

  const renderCards = (data) => {
    return (
      data &&
      data.map((item, index) => {
        return <CodeCard key={index} {...parse(item)} />;
      })
    );
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: Cols(listType) }}>
      {renderCards(dataSource)}
    </div>
  );
};

export default CodeMatrix;
