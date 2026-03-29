import React, { useState, useEffect } from "react";

function Dashboard() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
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
      console.log("API RESPONSE:", data);

      // IMPORTANT FIX
      setResult(data.result || data);

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
        <h2>🧠 AI Meeting Analyzer</h2>
        <button style={styles.logout} onClick={() => window.location.reload()}>
          Logout
        </button>
      </div>

      <div style={styles.main}>

        {/* LEFT PANEL */}
        <div style={styles.sidebar}>
          <h3>📊 History</h3>

          {history.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No history yet...</p>
          ) : (
            history.map((item, index) => (
              <div key={index} style={styles.historyCard}>
                <p><b>Input:</b> {item.input}</p>
                <p><b>Output:</b></p>
                {typeof item.output === "string" ? (
                  <p>{item.output}</p>
                ) : (
                  <pre style={{ whiteSpace: "pre-wrap" }}>
                    {JSON.stringify(item.output, null, 2)}
                  </pre>
                )}
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

          <button style={styles.button} onClick={runAI}>
            {loading ? "Analyzing..." : "🚀 Run Analysis"}
          </button>

          <h3 style={{ marginTop: "30px" }}>📌 Result</h3>

          {/* RESULT BOX */}
          <div style={styles.resultBox}>
            {!result ? (
              <p>No result yet...</p>
            ) : (
              <div>

                {/* DECISIONS */}
                <h3 style={{ color: "#60a5fa" }}>📌 Decisions</h3>
                {(typeof result.decisions === "string"
                  ? result.decisions.split("\n")
                  : result.decisions || []
                ).map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}

                {/* TASKS */}
                <h3 style={{ marginTop: "15px", color: "#22c55e" }}>📝 Tasks</h3>
                {(typeof result.tasks === "string"
                  ? result.tasks.split("\n")
                  : result.tasks || []
                ).map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}

                {/* ASSIGNMENTS */}
                <h3 style={{ marginTop: "15px", color: "#facc15" }}>👤 Assignments</h3>
                {(typeof result.assignments === "string"
                  ? result.assignments.split("\n")
                  : result.assignments || []
                ).map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}

                {/* MONITORING */}
                <h3 style={{ marginTop: "15px", color: "#f87171" }}>📊 Monitoring</h3>
                {(typeof result.monitoring === "string"
                  ? result.monitoring.split("\n")
                  : result.monitoring || []
                ).map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}

              </div>
            )}
          </div>

          {/* COPY BUTTON */}
          {result && (
            <button
              style={styles.copyBtn}
              onClick={() =>
                navigator.clipboard.writeText(
                  typeof result === "string"
                    ? result
                    : JSON.stringify(result, null, 2)
                )
              }
            >
              📋 Copy Result
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
    borderBottom: "1px solid rgba(255,255,255,0.1)"
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
    marginBottom: "10px"
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
    cursor: "pointer"
  },

  resultBox: {
    marginTop: "10px",
    padding: "20px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)"
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