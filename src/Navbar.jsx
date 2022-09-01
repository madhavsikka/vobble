import Box from "@mui/material/Box";
import Typography from "@mui/joy/Typography";

const Navbar = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--joy-palette-primary-900)",
        height: "3rem",
        display: "flex",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Typography textColor="white" fontWeight="lg" fontSize="xl">
        VOBBLE
      </Typography>
    </Box>
  );
};

export default Navbar;
