import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import FileButton from "./FileButton";
import EditorConfig from "./EditorConfig";
import InputFileCard from "./InputFileCard";
import { Grid } from "@mui/joy";
import { Flex } from "@chakra-ui/react";

const Editor = () => {
  const [inputFile, setInputFile] = useState();
  const [inputFileUrl, setInputFileUrl] = useState();

  useEffect(() => {
    if (inputFileUrl) window.URL.revokeObjectURL(inputFileUrl);
    if (inputFile) setInputFileUrl(URL.createObjectURL(inputFile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFile]);

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px",
        }}
      >
        <Box>
          <FileButton
            title="Select File"
            onFileSelect={(file) => setInputFile(file)}
          />

          <EditorConfig inputFile={inputFile} />
        </Box>

        <Box>
          {inputFile && (
            <InputFileCard inputFile={inputFile} inputFileUrl={inputFileUrl} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Editor;
