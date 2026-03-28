import React, { useState } from "react";
import { sendText } from "../api";

const InputBox = ({ setResult }) => {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const data = await sendText(text);
    setResult(data);
  };

  return (
    <div>
      <textarea
        rows="6"
        cols="50"
        placeholder="Paste meeting transcript..."
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Analyze</button>
    </div>
  );
};

export default InputBox;