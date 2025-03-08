"use client";

import { useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Card, CardContent } from "@mui/material";

const defaultCodeTemplates: { [key: string]: string } = {
  javascript: "// Write your JavaScript code here...",
  python: "# Write your Python code here...",
  c: "// Write your C code here...",
  cpp: "// Write your C++ code here...",
  java: "// Write your Java code here...",
};

const CodeEditor = ({ language, code, setCode }: { language: string; code: string; setCode: (code: string) => void }) => {
  
  useEffect(() => {
    // Reset code when language changes
    setCode(defaultCodeTemplates[language] || "// Write your code here...");
  }, [language, setCode]);

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        flex: 1, // Allow editor to expand
        display: "flex", // Needed for height to work
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
      }}
    >
      <CardContent sx={{ padding: 0, flex: 1, display: "flex", minHeight: 0 }}>
        <MonacoEditor
          width="100%"
          height="100%" // Ensures max height
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(newCode) => setCode(newCode || "")}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 10, bottom: 10 },
            automaticLayout: true,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditor;