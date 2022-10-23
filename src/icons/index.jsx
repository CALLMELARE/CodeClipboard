import IconBash from "./Bash.png";
import IconC from "./C.png";
import IconCSharp from "./CSharp.png";
import IconCSS from "./CSS.png";
import IconCpp from "./Cpp.png";
import IconGo from "./Golang.png";
import IconGraphQL from "./GraphQL.png";
import IconHTML from "./HTML.png";
import IconJava from "./Java.png";
import IconJavaScript from "./JavaScript.png";
import IconJSON from "./JSON.png";
import IconKotlin from "./Kotlin.png";
import IconMarkdown from "./Markdown.png";
import IconPython from "./Python.png";
import IconSCSS from "./SCSS.png";
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
  IconBash,
  IconC,
  IconCpp,
  IconCSharp,
  IconCSS,
  IconGo,
  IconGraphQL,
  IconHTML,
  IconJava,
  IconJavaScript,
  IconJSON,
  IconKotlin,
  IconMarkdown,
  IconPython,
  IconSCSS,
  IconSwift,
  IconTypeScript,
};
