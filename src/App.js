import "./App.css";
import Editor from "./Editor";

import { CssVarsProvider } from "@mui/joy/styles";

function App() {
  return (
    <CssVarsProvider>
      <div className="App">
        <Editor />
      </div>
    </CssVarsProvider>
  );
}

export default App;
