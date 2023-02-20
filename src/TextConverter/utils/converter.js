import {
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  startCase,
  words,
} from "lodash-es";
import { MATRIX_CODE } from "./constant";

const Converter = ({ code = "", origin = "" }) => {
  const allUpperCfg = (origin) => {
    return origin.toLocaleUpperCase();
  };

  const allLowerCfg = (origin) => {
    return origin.toLocaleLowerCase();
  };

  const upperFirstCfg = (origin) => {
    return capitalize(origin);
  };

  const startCaseCfg = (origin) => {
    return startCase(origin);
  };

  const camelCaseCfg = (origin) => {
    return camelCase(origin);
  };

  const kebabCaseCfg = (origin) => {
    return kebabCase(origin);
  };

  const snakeCaseCfg = (origin) => {
    return snakeCase(origin);
  };

  const toNumberCfg = (origin) => {
    return isNaN(Number(origin)) ? "不适用" : Number(origin);
  };

  const wordsCliceCfg = (origin) => {
    return words(origin).length > 0 ? JSON.stringify(words(origin)) : null;
  };

  const base64Encode = (origin) => {
    return origin;
  };

  const base64Decode = (origin) => {
    return origin;
  };

  switch (code) {
    case MATRIX_CODE.ALL_UPPER:
      return allUpperCfg(origin);
    case MATRIX_CODE.ALL_LOWER:
      return allLowerCfg(origin);
    case MATRIX_CODE.UPPER_FIRST:
      return upperFirstCfg(origin);
    case MATRIX_CODE.START_CASE:
      return startCaseCfg(origin);
    case MATRIX_CODE.CAMEL_CASE:
      return camelCaseCfg(origin);
    case MATRIX_CODE.KABAB_CASE:
      return kebabCaseCfg(origin);
    case MATRIX_CODE.SNAKE_CASE:
      return snakeCaseCfg(origin);
    case MATRIX_CODE.TO_NUMBER:
      return toNumberCfg(origin);
    case MATRIX_CODE.WORDS_CLICE:
      return wordsCliceCfg(origin);
    case MATRIX_CODE.BASE64_ENCODE:
      return base64Encode(origin);
    case MATRIX_CODE.BASE64_DECODE:
      return base64Decode(origin);
    default:
      return origin;
  }
};

export default Converter;
