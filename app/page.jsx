import { Box, Container, Paper } from "@mui/material";


export default function Home() {
  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        initial box
      </Box>
      <Paper
        sx={{
          padding: 2,
          borderRadius: 2,
          maxWidth: "80%",
          margin: "0 auto",
          height: "400px",
        }}
      >
        this is paper
      </Paper>
      </Container>
  );
}
