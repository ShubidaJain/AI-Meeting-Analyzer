import React, { useState, useEffect } from "react";

function Dashboard() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const runAI = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data.result || JSON.stringify(data));
      fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Error running AI");
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/history");
      const data = await res.json();
      setHistory(data);
    } catch {}
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>AI Meeting Analyzer</h2>
        <button style={styles.logout} onClick={() => window.location.reload()}>
          Logout
        </button>
      </div>

      <div style={styles.main}>

        {/* LEFT PANEL */}
        <div style={styles.sidebar}>
          <h3>History</h3>

          {history.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No history yet...</p>
          ) : (
            history.map((item, index) => (
              <div key={index} style={styles.historyCard}>
                <p><b>Input:</b> {item.input}</p>
                <p><b>Output:</b> {item.output}</p>
              </div>
            ))
          )}
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.content}>

          <h1>Analyze Meeting Notes</h1>

          <textarea
            placeholder="Paste your meeting discussion here..."
            style={styles.textarea}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            style={styles.button}
            onClick={runAI}
          >
            {loading ? "Analyzing..." : "Run Analysis"}
          </button>

          <h3 style={{ marginTop: "30px" }}>Result</h3>

          <div style={styles.resultBox}>
            {result
              ? result.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))
              : "No result yet..."}
          </div>

          {result && (
            <button
              style={styles.copyBtn}
              onClick={() => navigator.clipboard.writeText(result)}
            >
              Copy Result
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "white",
    fontFamily: "Arial, sans-serif"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)"
  },

  logout: {
    background: "#ef4444",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer"
  },

  main: {
    display: "flex"
  },

  sidebar: {
    width: "30%",
    padding: "20px",
    borderRight: "1px solid rgba(255,255,255,0.1)",
    height: "calc(100vh - 60px)",
    overflowY: "auto"
  },

  historyCard: {
    background: "rgba(255,255,255,0.05)",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    backdropFilter: "blur(10px)"
  },

  content: {
    width: "70%",
    padding: "40px"
  },

  textarea: {
    width: "100%",
    height: "120px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    marginTop: "20px"
  },

  button: {
    marginTop: "15px",
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
    transition: "0.3s"
  },

  resultBox: {
    marginTop: "10px",
    padding: "20px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)"
  },

  copyBtn: {
    marginTop: "10px",
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: "pointer"
  }
};

export default Dashboard;