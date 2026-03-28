const API_URL = "http://127.0.0.1:8000/run";

export const sendText = async (text) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return response.json();
};