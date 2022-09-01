import Button from "@mui/joy/Button";
import { useRef } from "react";

const FileButton = ({ title, onFileSelect, ...props }) => {
  const inputRef = useRef();

  return (
    <>
      <input
        type="file"
        hidden={true}
        ref={inputRef}
        onChange={(e) => onFileSelect(e.target.files?.item(0))}
      />
      <Button
        color="primary"
        onClick={() => inputRef.current.click()}
        variant="outlined"
        size="lg"
        {...props}
      >
        {title}
      </Button>
    </>
  );
};

export default FileButton;
