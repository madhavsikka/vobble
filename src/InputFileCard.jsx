import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { useEffect, useRef, useState } from "react";
import { Stack } from "@mui/joy";

const InputFileCard = ({ inputFile, inputFileUrl }) => {
  // return (
  //   <Card component="li" sx={{ minWidth: 300, flexGrow: 1, margin: "20px" }}>
  //     <CardCover>
  //       <video autoPlay loop muted src={inputFileUrl} />
  //     </CardCover>
  //     <CardContent sx={{ justifyContent: "center", gap: 1 }}>
  //       <Typography fontWeight="lg" textColor="#fff" mt={{ xs: 12, sm: 18 }}>
  //         {inputFile.name}
  //       </Typography>
  //     </CardContent>
  //   </Card>
  // );
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingX: "20px",
            }}
          >
            <Typography level="body2" fontWeight="bold">
              Duration
            </Typography>
            <Typography level="body2">{videoDuration} s</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingX: "20px",
            }}
          >
            <Typography level="body2" fontWeight="bold">
              Size
            </Typography>
            <Typography level="body2">
              {Math.round((inputFile.size / 1024) * 10) / 10} KB
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingX: "20px",
            }}
          >
            <Typography level="body2" fontWeight="bold">
              Format
            </Typography>
            <Typography level="body2">
              {inputFile.name.split(".").pop()}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingX: "20px",
            }}
          >
            <Typography level="body2" fontWeight="bold">
              Resolution
            </Typography>
            <Typography level="body2">
              {videPlayerRef.current.videoWidth} x{" "}
              {videPlayerRef.current.videoHeight}
            </Typography>
          </Box>
        </Stack>
      )}
    </Card>
  );
};

export default InputFileCard;
