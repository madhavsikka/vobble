import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { useEffect, useMemo, useRef, useState } from "react";
import { Stack } from "@mui/joy";

const InputFileCard = ({ inputFile, inputFileUrl }) => {
  const videPlayerRef = useRef();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState();
  useEffect(() => {
    console.log(isVideoLoaded);
    if (isVideoLoaded) {
      console.log("loaded: ", videPlayerRef.current);
      setVideoDuration(Math.round(videPlayerRef.current.duration * 10) / 10);
    }
  }, [isVideoLoaded]);

  const infoProperties = useMemo(() => {
    if (!isVideoLoaded) return {};
    const data = {
      Duration: videoDuration + " s",
      Size: Math.round((inputFile.size / 1024) * 10) / 10 + " KB",
      Format: inputFile.name.split(".").pop(),
      Resolution:
        videPlayerRef.current.videoWidth +
        " x " +
        videPlayerRef.current.videoHeight,
    };
    return data;
  }, [inputFile, isVideoLoaded, videoDuration]);

  return (
    <Card variant="outlined" sx={{ minWidth: "320px" }}>
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <video
          src={inputFileUrl}
          ref={videPlayerRef}
          onLoadedData={() => setIsVideoLoaded(true)}
        />
      </AspectRatio>
      {isVideoLoaded && (
        <Stack spacing={1}>
          {Object.entries(infoProperties).map(([key, value]) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingX: "20px",
              }}
            >
              <Typography level="body2" fontWeight="bold">
                {key}
              </Typography>
              <Typography level="body2">{value}</Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Card>
  );
};

export default InputFileCard;
