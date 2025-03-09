"use client";

import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Card, CardContent, Button, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material"; // Import MUI icons
const defaultCodeTemplates: { [key: string]: string } = {
  javascript: "// Write your JavaScript code here...",
  python: "# Write your Python code here...",
  c: "// Write your C code here...",
  cpp: "// Write your C++ code here...",
  java: "// Write your Java code here...",
};

const CodeEditor = ({ language, code, setCode }: { language: string; code: string; setCode: (code: string) => void }) => {
  const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">("vs-dark");

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
        backgroundColor: editorTheme === "vs-dark" ? "#1e1e1e" : "#ffffff",
      }}
    >
      <CardContent sx={{ padding: 0, flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        {/* Theme Toggle Button */}
        <IconButton
          onClick={() => setEditorTheme(editorTheme === "vs-dark" ? "light" : "vs-dark")}
          sx={{
            alignSelf: "flex-end",
            margin: "10px",
            color: editorTheme === "vs-dark" ? "#fff" : "#333",
          }}
        >
          {editorTheme === "vs-dark" ? <LightMode /> : <DarkMode />}
        </IconButton>

        {/* Monaco Editor */}
        <MonacoEditor
          width="100%"
          height="100%"
          language={language}
          theme={editorTheme}
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