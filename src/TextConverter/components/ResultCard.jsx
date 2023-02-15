const ResultCard = ({ label, text }) => {
  return (
    <div className="tc-result-card">
      <div className="tc-result-card-label">{label}</div>
      <div className="tc-result-card-text">{text}</div>
    </div>
  );
};

export default ResultCard;
