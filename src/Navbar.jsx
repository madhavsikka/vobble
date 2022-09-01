import Box from "@mui/material/Box";
import Typography from "@mui/joy/Typography";

const Navbar = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        height: "3rem",
        display: "flex",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Typography textColor="white" fontWeight="lg" fontSize="xl">
        Vobble
      </Typography>
    </Box>
  );
};

export default Navbar;
