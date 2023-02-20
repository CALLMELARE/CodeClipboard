import { useSelector, useDispatch } from "react-redux";
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
import { useEffect, useState, useCallback } from "react";
import Converter from "../utils/converter";

const ResultMatrix = ({ origin = "" }) => {
  const [state, setState] = useState({});
  const [matrix, setMatrix] = useState();

  // store
  const { matrixMenu, matrixBlackList } = useSelector((s) => s.matrix);

  const MatrixRender = useCallback(
    (data, origin) => {
      return data.map((item) => {
        if (item.children) {
          return (
            <ResultPart label={item.text}>
              {MatrixRender(item.children, origin)}
            </ResultPart>
          );
        } else if (matrixBlackList.indexOf(item.code) === -1) {
          return (
            <ResultCard
              label={item.text}
              text={Converter({ code: item.code, origin })}
            />
          );
        }
      });
    },
    [matrixBlackList]
  );

  useEffect(() => {
    setMatrix(MatrixRender(matrixMenu, origin));
  }, [MatrixRender, matrixBlackList, matrixMenu, origin]);

  return <div className="tc-result-matrix">{matrix}</div>;
};

export default ResultMatrix;
