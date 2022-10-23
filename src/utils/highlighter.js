const stressStyle = {
  background: "rgba(45,50,56,.1)",
  borderRadius: "4px",
};

const highlightKeyword = (content, keyWord) => {
  const index = content
    .toLocaleUpperCase()
    .indexOf(keyWord.toLocaleUpperCase());
  const regex = new RegExp(keyWord, "gi");
  if (index !== -1) {
    return content.replace(regex, (text) => {
      return `<font style="background:${stressStyle.background};border-radius:${stressStyle.borderRadius};">${text}</font>`;
    });
  }
};

export { highlightKeyword };
