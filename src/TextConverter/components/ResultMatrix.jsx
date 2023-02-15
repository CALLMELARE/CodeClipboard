import { upperFirst } from "lodash-es";
import ResultCard from "./ResultCard";

const ResultMatrix = ({ origin = "" }) => {
  const allUpperCfg = {
    label: "全部大写",
    text: origin.toLocaleUpperCase(),
  };

  const allLowerCfg = {
    label: "全部小写",
    text: origin.toLocaleLowerCase(),
  };

  const upperFirstCfg = {
    label: "首字母大写",
    text: upperFirst(origin),
  };

  return (
    <div className="tc-result-matrix">
      <ResultCard {...allUpperCfg} />
      <ResultCard {...allLowerCfg} />
      <ResultCard {...upperFirstCfg} />
    </div>
  );
};

export default ResultMatrix;
