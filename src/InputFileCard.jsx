import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

const InputFileCard = ({ inputFile, inputFileUrl }) => {
  return (
    <Card component="li" sx={{ minWidth: 300, flexGrow: 1, margin: "20px" }}>
      <CardCover>
        <video autoPlay loop muted src={inputFileUrl} />
      </CardCover>
      <CardContent sx={{ justifyContent: "center", gap: 1 }}>
        <Typography fontWeight="lg" textColor="#fff" mt={{ xs: 12, sm: 18 }}>
          {inputFile.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InputFileCard;
