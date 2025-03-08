"use client";

import MonacoEditor from "@monaco-editor/react";
import { Card, CardContent } from "@mui/material";

const defaultCodeTemplates: { [key: string]: string } = {
    javascript: "// Write your code here...",
    python: "# Write your code here...",
    c: "// Write your code here...",
    cpp: "// Write your code here...",
    java: "// Write your code here...",
  };

  
const CodeEditor = ({ language, code, setCode }: { language: string; code: string; setCode: (code: string) => void }) => {
  return (
    <Card sx={{ width: "100%", borderRadius: 3, overflow: "hidden", backgroundColor: "#1e1e1e" }}>
      <CardContent sx={{ padding: 0 }}>
        <MonacoEditor
          height="calc(100vh - 200px)"
          language={language}
          theme="vs-dark"
          value={code}
          defaultValue={defaultCodeTemplates[language]}
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