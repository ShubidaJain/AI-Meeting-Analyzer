import React from "react";

const Results = ({ result }) => {
  if (!result) return null;

  return (
    <div>
      <h2>Decisions</h2>
      <pre>{result.decisions}</pre>

      <h2>Tasks</h2>
      <pre>{result.tasks}</pre>

      <h2>Assignments</h2>
      <pre>{result.assignments}</pre>

      <h2>Monitoring</h2>
      <pre>{result.monitoring}</pre>
    </div>
  );
};

export default Results;