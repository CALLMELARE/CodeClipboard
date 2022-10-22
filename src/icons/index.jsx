import IconC from "./C.png";
import IconCSharp from "./CSharp.png";
import IconCSS from "./CSS.png";
import IconCpp from "./Cpp.png";
import IconHTML from "./HTML.png";
import IconJava from "./Java.png";
import IconJavaScript from "./JavaScript.png";
import IconPython from "./Python.png";
import IconSwift from "./Swift.png";
import IconTypeScript from "./TypeScript.png";

const Icon = ({ src, size = "1em", style, ...props }) => {
  return (
    <img
      alt="icon"
      src={src}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  );
};

export default Icon;
export {
  IconC,
  IconCpp,
  IconCSharp,
  IconCSS,
  IconHTML,
  IconJava,
  IconJavaScript,
  IconPython,
  IconSwift,
  IconTypeScript,
};
