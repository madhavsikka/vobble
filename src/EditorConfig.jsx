import { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";

const ffmpeg = createFFmpeg({ log: true });

const supportedFileTypes = ["mp4", "avi", "mov", "mkv", "flv"];

const EditorConfig = ({ inputFile }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [outputFileType, setOutputFileType] = useState();
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState();
  const [convertedFileName, setConvertedFileName] = useState();

  const loadFfmpeg = async () => {
    await ffmpeg.load();
    setIsLoaded(true);
  };

  useEffect(() => {
    loadFfmpeg();
  }, []);

  useEffect(() => {
    setOutputFileType();
    setConvertedFileUrl();
    setConvertedFileName();
    window.URL.revokeObjectURL(convertedFileUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFile]);

  const convertFile = async () => {
    setIsConverting(true);
    const splitFileName = inputFile?.name.split(".");
    const fileExtension =
      splitFileName?.[splitFileName.length - 1].toLowerCase();
    if (
      !splitFileName ||
      splitFileName.length <= 1 ||
      !supportedFileTypes.includes(fileExtension) ||
      !outputFileType
    ) {
      return;
    }
    const outputFileName =
      splitFileName.slice(0, splitFileName.length - 1).join("") +
      "." +
      outputFileType;
    ffmpeg.FS("writeFile", inputFile.name, await fetchFile(inputFile));
    await ffmpeg.run("-i", inputFile.name, outputFileName);
    const data = ffmpeg.FS("readFile", outputFileName);
    setConvertedFileName(outputFileName);
    const url = URL.createObjectURL(new Blob([data.buffer]));
    setConvertedFileUrl(url);
    setIsConverting(false);
  };

  const downloadHandler = () => {
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = convertedFileUrl;
    tempLink.setAttribute("download", convertedFileName);
    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "200px",
        gap: "20px",
      }}
    >
      <Select
        color="primary"
        placeholder="To"
        variant="outlined"
        onChange={(type) => setOutputFileType(type)}
      >
        {supportedFileTypes.map((type) => (
          <Option value={type}>{type.toUpperCase()}</Option>
        ))}
      </Select>
      {isLoaded && !convertedFileName && (
        <Button color="primary" variant="solid" size="lg" onClick={convertFile}>
          {isConverting ? "Processing" : "Convert"}
        </Button>
      )}
      {convertedFileName && (
        <Button
          color="primary"
          variant="solid"
          size="lg"
          onClick={downloadHandler}
        >
          Download
        </Button>
      )}
    </Box>
  );
};

export default EditorConfig;
