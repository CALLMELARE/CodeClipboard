const ResultPart = ({ label = "", children }) => {
  return (
    <div className="tc-result-part">
      <div className="tc-result-part-label">{label}</div>
      <div className="tc-result-part-content">{children}</div>
    </div>
  );
};

export default ResultPart;
