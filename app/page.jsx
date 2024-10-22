import { Box, Container, Paper, Typography } from "@mui/material";


export default function Home() {
  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      </Box>
      <Paper
        sx={{
          padding: 2,
          borderRadius: 2,
          maxWidth: "80%",
          margin: "auto",
          height: "400px",
          alignContent: 'center',
          justifyContent: 'center',
          mb: 10
        }}
      >
        <Typography variant="h3" width={'100%'}>
          This is the home page
        </Typography>
      </Paper>
      </Container>
  );
}
