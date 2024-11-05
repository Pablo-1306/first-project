import Grid from "@mui/material/Grid2";

export default function AutoGrid({ requiredSpaces }) {
  return (
    <Grid container spacing={4} justifyContent="center">
      {requiredSpaces.map((space) => (
        <Grid
          size={{ xs: 12, md: 12 / requiredSpaces.length }}
          sx={{ textAlign: "center" }}
          key={space}
        >
          {space}
        </Grid>
      ))}
    </Grid>
  );
}
