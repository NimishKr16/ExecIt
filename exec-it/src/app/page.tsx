"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import CodeEditor from "@/components/CodeEditor";
import { Typewriter } from "react-simple-typewriter";
const languages = {
  javascript: "javascript",
  python: "python",
  c: "c",
  cpp: "cpp",
  java: "java",
};

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check if screen is small
  const text = "ExecIt - Online Code Compiler";

  useEffect(() => {
    // Reset code and output when language changes
    setOutput(""); // Clear the output when the language is changed
    setInput(""); // Clear the input when the language is changed
  }, [language]);

  const runCode = async () => {
    setOutput("Running..."); // Show loading state

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, code, input }),
      });

      const result = await res.json();

      if (result.error) {
        setOutput(`Error:\n${result.error}`);
      } else {
        setOutput(result.output);
      }
    } catch (err) {
      setOutput("Failed to execute code");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, color: "white", height: "90vh" }}>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          textAlign: "center",
          mb: 2,
          fontSize: { xs: "24px", md: "32px" },
        }}
      >
        <Typewriter words={[text]} typeSpeed={50} />
      </Typography>

      {/* Main Layout (Responsive) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on small screens
          gap: 2,
          height: "80vh",
        }}
      >
        {/* Left Side: Code Editor (Bigger) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            flex: 1.3,
            display: "flex",
            flexDirection: "column",
            width: isMobile ? "100%" : "auto", // Full width on mobile
          }}
        >
          {/* Top Bar: Language Selector & Run Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              mb: 2,
            }}
          >
            {/* Language Selector (Smaller) */}
            <FormControl
              variant="outlined"
              sx={{ width: { xs: "120px", md: "150px" } }}
            >
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="Language"
                sx={{
                  backgroundColor: "#1e1e1e",
                  color: "white",
                  borderRadius: 2,
                  fontSize: { xs: "12px", md: "14px" },
                }}
              >
                {Object.keys(languages).map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Run Button (Top-right) */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: { xs: "100px", md: "120px" },
                height: { xs: "35px", md: "40px" },
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: "bold",
                borderRadius: 2,
                backgroundColor: "#00bcd4",
                "&:hover": { backgroundColor: "#008ba3" },
              }}
              onClick={runCode}
            >
              Run Code
            </Button>
          </Box>

          {/* Code Editor (Bigger) */}
          <CodeEditor language={language} code={code} setCode={setCode} />
        </motion.div>

        {/* Right Side: Input & Output (Smaller) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            flex: 0.7,
            display: "flex",
            flexDirection: "column",
            width: isMobile ? "100%" : "auto", // Full width on mobile
          }}
        >
          {/* User Input */}
          <Box
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: 2,
              padding: 2,
              mb: 2,
              mt: 8,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "primary.main",
                mb: 1,
                fontSize: { xs: "16px", md: "18px" },
              }}
            >
              Input
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "#121212",
                borderRadius: 2,
                color: "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#00bcd4" },
                  "&:hover fieldset": { borderColor: "#008ba3" },
                },
              }}
            />
          </Box>

          {/* Output Box (Smaller) */}
          <Box
            sx={{
              mt: 2,
              backgroundColor: "#181818", // Slightly darker for contrast
              borderRadius: 2,
              padding: 2,
              flexGrow: 1,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow
              border: "1px solid #333", // Border for a more defined look
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#00bcd4",
                mb: 1,
                fontSize: { xs: "16px", md: "18px" },
                fontWeight: "bold",
              }}
            >
              Terminal Output
            </Typography>

            {/* Scrollable Output Box */}
            <Box
              sx={{
                backgroundColor: "#121212",
                borderRadius: 2,
                padding: 2,
                color: "white",
                fontFamily: "monospace", // Like a real terminal
                fontSize: "14px",
                whiteSpace: "pre-wrap", // Keeps formatting
                overflowY: "auto",
                maxHeight: "200px", // Prevents growing too large
                border: "1px solid #333",
              }}
            >
              {output ? (
                output.split("\n").map((line, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color:
                        line.includes("Error") || line.includes("Failed")
                          ? "#ff5252"
                          : "#00ff00",
                      fontWeight: line.includes("Error") ? "bold" : "normal",
                    }}
                  >
                    {line}
                  </Typography>
                ))
              ) : (
                <Typography sx={{ color: "#888", fontStyle: "italic" }}>
                  No output yet...
                </Typography>
              )}
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
}
