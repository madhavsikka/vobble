import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import FileButton from "./FileButton";
import EditorConfig from "./EditorConfig";
import InputFileCard from "./InputFileCard";

const Editor = () => {
  const [inputFile, setInputFile] = useState();
  const [inputFileUrl, setInputFileUrl] = useState();

  useEffect(() => {
    if (inputFileUrl) window.URL.revokeObjectURL(inputFileUrl);
    if (inputFile) setInputFileUrl(URL.createObjectURL(inputFile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFile]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {inputFile && (
          <InputFileCard inputFile={inputFile} inputFileUrl={inputFileUrl} />
        )}

        <FileButton
          title="Select File"
          onFileSelect={(file) => setInputFile(file)}
          sx={{
            margin: "20px",
          }}
        />

        <EditorConfig inputFile={inputFile} />
      </Box>
    </>
  );
};

export default Editor;
