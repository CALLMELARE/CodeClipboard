import { compile, parse } from "./compiler";
import { getLocalStorage, setLocalStorage } from "./storage";
import UUID from "uuidjs";

// 创建
const create = (v) => {
  const uuid = UUID.generate();
  // 检查是否重复
  check(uuid).then((res) => {
    if (!res) {
      return new Promise((resolve, reject) => {
        const raw = getLocalStorage("data");
        const obj = {
          id: uuid,
          ...v,
        };
        const result = [...raw, compile(obj)];
        setLocalStorage("data", result);
        resolve({ msg: "创建成功" });
      });
    }
  });
};

// 修改
const modify = (v) => {
  return new Promise((resolve, reject) => {
    const raw = getLocalStorage("data");
    let data = parse(raw);
    let index = null;
    for (let item in data) {
      if (data[item].id === id) {
        index = item;
        break;
      }
    }
    if (index) {
      const obj = { ...v };
      data[index] = obj;
      const result = [compile(data)];
      setLocalStorage("data", result);
      resolve("修改成功");
    } else {
      resolve("该条信息不存在");
    }
  });
};

// 检查
const check = (id) => {
  return new Promise((resolve, reject) => {
    const raw = getLocalStorage("data");
    const data = parse(raw);
    for (let item in data) {
      if (data[item].id === id) {
        resolve(id);
      }
    }
    resolve();
  });
};

const remove = ({ id }) => {
  return new Promise((resolve, reject) => {
    const raw = getLocalStorage("data");
    let data = parse(raw);
    let index = null;
    for (let item in data) {
      if (data[item].id === id) {
        index = item;
        break;
      }
    }
    if (index) {
      data = [...data.slice(0, index - 1), ...data.slice(index)];
      const result = [compile(data)];
      setLocalStorage("data", result);
      resolve("删除成功");
    } else {
      resolve("该条信息不存在");
    }
  });
};

export { create, modify, check, remove };
