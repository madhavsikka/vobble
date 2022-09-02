import Editor from "./Editor";

import { CssVarsProvider } from "@mui/joy/styles";
import { Box } from "@mui/joy";

function App() {
  return (
    <CssVarsProvider>
      <Box>
        <Editor />
      </Box>
    </CssVarsProvider>
  );
}

export default App;
