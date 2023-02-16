import {
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  startCase,
  words,
} from "lodash-es";

import ResultCard from "./ResultCard";
import ResultPart from "./ResultPart";

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
    label: "行首大写",
    text: capitalize(origin),
  };

  const startCaseCfg = {
    label: "词首大写",
    text: startCase(origin),
  };

  const camelCaseCfg = {
    label: "驼峰",
    text: camelCase(origin),
  };

  const kebabCaseCfg = {
    label: "短横线连接",
    text: kebabCase(origin),
  };

  const snakeCaseCfg = {
    label: "下划线连接",
    text: snakeCase(origin),
  };

  const toNumberCfg = {
    label: "数值",
    text: isNaN(Number(origin)) ? "不适用" : Number(origin),
  };

  const wordsCfg = {
    label: "单词抽取",
    text: words(origin).length > 0 ? JSON.stringify(words(origin)) : null,
  };

  const Base64Encode = {
    label: "加密",
    text: origin,
  };

  return (
    <div className="tc-result-matrix">
      <ResultPart label="常用文本转换">
        <ResultCard {...allUpperCfg} />
        <ResultCard {...allLowerCfg} />
        <ResultCard {...upperFirstCfg} />
        <ResultCard {...startCaseCfg} />
        <ResultCard {...camelCaseCfg} />
        <ResultCard {...kebabCaseCfg} />
        <ResultCard {...snakeCaseCfg} />
        <ResultCard {...toNumberCfg} />
        <ResultCard {...wordsCfg} />
      </ResultPart>
      <ResultPart label="Base64">
        <ResultCard {...Base64Encode} />
      </ResultPart>
    </div>
  );
};

export default ResultMatrix;
