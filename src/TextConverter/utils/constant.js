const MATRIX_CATRGORY = {
  COMMON: "common",
  BASE64: "base64",
};

const MATRIX_CODE = {
  ALL_UPPER: "all_upper",
  ALL_LOWER: "all_lower",
  UPPER_FIRST: "upper_first",
  START_CASE: "start_case",
  CAMEL_CASE: "camel_case",
  KABAB_CASE: "caab_case",
  SNAKE_CASE: "snow_case",
  TO_NUMBER: "to_number",
  WORDS_CLICE: "words_clice",
  BASE64_ENCODE: "base64_encode",
  BASE64_DECODE: "base64_decode",
};

const MATRIX_MENU = [
  {
    code: MATRIX_CATRGORY.COMMON,
    text: "常用文本转换",
    children: [
      {
        code: MATRIX_CODE.ALL_UPPER,
        text: "全部大写",
      },
      {
        code: MATRIX_CODE.ALL_LOWER,
        text: "全部小写",
      },
      {
        code: MATRIX_CODE.UPPER_FIRST,
        text: "行首大写",
      },
      {
        code: MATRIX_CODE.START_CASE,
        text: "词首大写",
      },
      {
        code: MATRIX_CODE.CAMEL_CASE,
        text: "驼峰",
      },
      {
        code: MATRIX_CODE.KABAB_CASE,
        text: "短横线连接",
      },
      {
        code: MATRIX_CODE.SNAKE_CASE,
        text: "下划线连接",
      },
      {
        code: MATRIX_CODE.TO_NUMBER,
        text: "转为数值",
      },
      {
        code: MATRIX_CODE.WORDS_CLICE,
        text: "单词抽取",
      },
    ],
  },
  {
    code: MATRIX_CATRGORY.BASE64,
    text: "Base64",
    children: [
      {
        code: MATRIX_CODE.BASE64_ENCODE,
        text: "加密",
      },
      {
        code: MATRIX_CODE.BASE64_DECODE,
        text: "解密",
      },
    ],
  },
];

export { MATRIX_CODE, MATRIX_MENU };