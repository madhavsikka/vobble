import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import FileButton from "./FileButton";
import EditorConfig from "./EditorConfig";

const Editor = () => {
  const [inputFile, setInputFile] = useState();
  const [inputFileUrl, setInputFileUrl] = useState();
  const [convertedFile, setConvertedFile] = useState();

  useEffect(() => {
    if (inputFileUrl) window.URL.revokeObjectURL(inputFileUrl);
    if (inputFile) setInputFileUrl(URL.createObjectURL(inputFile));
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
        {inputFileUrl && <video controls src={inputFileUrl} />}

        <FileButton
          title="Select File"
          onFileSelect={(file) => setInputFile(file)}
          sx={{
            margin: "20px",
          }}
        />

        <EditorConfig
          inputFile={inputFile}
          onFileConverted={(file) => setConvertedFile(file)}
        />
      </Box>
    </>
  );
};

export default Editor;
