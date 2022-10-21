import CodeCard from "./CodeCard";

const CodeMatrix = ({ dataSource }) => {
  const renderCards = (data) => {
    return data.map((item, index) => {
      const { title, content, updated, created, locked, language } = item;
      return (
        <CodeCard
          title="test"
          content="arr.includes(searchElement [, fromIndex])"
          language="JavaScript"
        />
      );
    });
  };

  return (
    <>
      <CodeCard
        title="test"
        content="arr.includes(searchElement [, fromIndex])"
        language="JavaScript"
      />
    </>
  );
};

export default CodeMatrix;
