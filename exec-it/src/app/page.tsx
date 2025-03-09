"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const languages: { [key: string]: string } = {
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
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check if screen is small
  const text = "ExecIt - Online Code Compiler";

  useEffect(() => {
    // Reset code and output when language changes
    setOutput(""); // Clear the output when the language is changed
    setInput(""); // Clear the input when the language is changed
  }, [language]);

  const handleImproveWithAI = async () => {
    if (!code) {
      alert("Write some code first!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/improve-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setSuggestions(data.suggestions); // Store AI response
    } catch (error) {
      console.error("AI Suggestion Error:", error);
    }

    setLoading(false);
  };

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
          mt: 5,
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
    justifyContent: { xs: "center", md: "space-between" }, // Centered on mobile, spaced on desktop
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2, // Add spacing between elements
    mb: 2,
    flexDirection: { xs: "column", md: "row" }, // Column for mobile, row for desktop
  }}
>
  {/* Language Selector (Smaller on Mobile) */}
  <FormControl
    variant="outlined"
    sx={{ width: { xs: "100%", sm: "150px" } }} // Full width on very small screens
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

  {/* Button Container (Ensures buttons are always together on desktop) */}
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" }, // Stack buttons on mobile, row on desktop
      alignItems: "center",
      gap: { xs: 1, md: 2 }, // Smaller gap on mobile, larger on desktop
    }}
  >
    {/* Run Button */}
    <Button
      variant="contained"
      sx={{
        background: "linear-gradient(135deg, #1976d2 30%, #1565c0 90%)",
        color: "white",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.4)",
        "&:hover": {
          background: "linear-gradient(135deg, #1565c0 30%, #0d47a1 90%)",
          boxShadow: "0px 6px 14px rgba(21, 101, 192, 0.6)",
          transform: "translateY(-2px)",
        },
        "&:active": {
          transform: "scale(0.98)",
          boxShadow: "0px 2px 6px rgba(21, 101, 192, 0.4)",
        },
        width: { xs: "100%", md: "auto" }, // Full width on mobile
      }}
      onClick={runCode}
    >
      ⚡️ Run Code
    </Button>

    {/* Improve with AI Button */}
    <Button
      variant="contained"
      sx={{
        background: "linear-gradient(135deg, #1976d2 30%, #1565c0 90%)",
        color: "white",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.4)",
        "&:hover": {
          background: "linear-gradient(135deg, #1565c0 30%, #0d47a1 90%)",
          boxShadow: "0px 6px 14px rgba(21, 101, 192, 0.6)",
          transform: "translateY(-2px)",
        },
        "&:active": {
          transform: "scale(0.98)",
          boxShadow: "0px 2px 6px rgba(21, 101, 192, 0.4)",
        },
        width: { xs: "100%", md: "auto" }, // Full width on mobile
      }}
      onClick={handleImproveWithAI}
    >
      🚀 Improve with AI
    </Button>
  </Box>
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
              Output
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
                maxHeight: "400px", // Prevents growing too large
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
      <Dialog
        open={Boolean(suggestions)}
        onClose={() => setSuggestions("")}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "90%", // Adjust width for responsiveness
            maxWidth: "500px", // Limit max width for larger screens
            borderRadius: "12px", // Rounded corners for a modern look
          },
        }}
      >
        <DialogTitle>AI Code Improvements</DialogTitle>
        <DialogContent
        sx={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
        >
          <SyntaxHighlighter
            language={languages[language] || "plaintext"}
            style={oneDark}
          >
            {suggestions || "Loading..."}
          </SyntaxHighlighter>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuggestions("")} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
