import { compile, parse } from "./compiler";
import { getLocalStorage, setLocalStorage } from "./storage";
import UUID from "uuidjs";

// 创建
const create = (v) => {
  return new Promise((resolve, reject) => {
    const uuid = UUID.generate();
    const raw = getLocalStorage("data"); // []
    const obj = {
      ...v,
    };
    obj.id = uuid;
    console.log("create:", obj);
    const result = raw.concat(compile(obj));
    setLocalStorage("data", result);
    resolve({ msg: "创建成功" });
  });
};

// 修改
const modify = (v) => {
  return new Promise((resolve, reject) => {
    const raw = getLocalStorage("data");
    let data = raw.map((item, index) => {
      return item
    });
    let index = null;
    for (let item in data) {
      if (data[item].i === v.id) {
        index = item;
        console.log(index)
        break;
      }
    }
    if (index) {
      const obj = { ...v };
      console.log("modify:", obj);
      data[index] = compile(obj);
      const result = data;
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
    console.log(data);
    if (data) {
      for (let item in data) {
        if (data[item].id === id) {
          resolve(id);
        }
      }
    }
    resolve();
  });
};

// 删除
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
