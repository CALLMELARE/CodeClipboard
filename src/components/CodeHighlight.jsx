import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const CodeHighlight = ({ language = "text", content }) => {
  return (
    <pre
      style={{ fontFamily: "JetBrainsMono", fontSize: "14px" }}
      dangerouslySetInnerHTML={{
        __html: hljs.highlight(content, { language: language }).value,
      }}
    ></pre>
  );
};

export default CodeHighlight;