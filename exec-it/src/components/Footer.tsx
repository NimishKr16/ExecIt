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
        © {new Date().getFullYear()} ExecIt - Built by Nimish Kumar
      </Typography>

      <Box sx={{ mt: 1 }}>
        <IconButton component={Link} href="https://github.com/Nimish-Kumar" target="_blank">
          <GitHub />
        </IconButton>
        <IconButton component={Link} href="https://linkedin.com/in/nimish-kumar" target="_blank">
          <LinkedIn />
        </IconButton>
        <IconButton component={Link} href="https://nimishkumar.dev" target="_blank">
          <Language />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;