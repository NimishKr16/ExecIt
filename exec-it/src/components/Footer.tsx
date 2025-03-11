import { Box, Typography, Link, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Language } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 2,
        mt: 4,
        backgroundColor: "background.paper",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 ExecIt - Built by Nimish Kumar
      </Typography>
      
      <Box sx={{ mt: 1 }}>
        <IconButton component={Link} href="https://github.com/NimishKr16" target="_blank">
          <GitHub />
        </IconButton>
        <IconButton component={Link} href="https://www.linkedin.com/in/nimish-kumar16/" target="_blank">
          <LinkedIn />
        </IconButton>
        <IconButton component={Link} href="https://nimishkumar.vercel.app/" target="_blank">
          <Language />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;