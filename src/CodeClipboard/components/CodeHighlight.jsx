import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const CodeHighlight = ({ language, content }) => {
  return (
    <>
      {content ? (
        <pre
          style={{ fontFamily: "JetBrainsMono", fontSize: "14px" }}
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(content, { language: language || "text" })
              .value,
          }}
        ></pre>
      ) : null}
    </>
  );
};

export default CodeHighlight;
