"use client";

import { Box, Container, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";

import SettingsIcon from "@mui/icons-material/Settings";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PublicIcon from "@mui/icons-material/Public";
import HandshakeIcon from "@mui/icons-material/Handshake";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";

export default function About() {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} alignItems="center">
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ padding: { xs: 0, md: "0 0 0 100px" } }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", mt: 6 }}>
            Our Brand
          </Typography>

          <Box sx={{ borderBottom: "2px solid black", width: "50px" }} />

          <Typography
            variant="body1"
            paragraph
            sx={{ color: theme.palette.text.dark, fontSize: "1.1rem" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            recusandae nemo dolores. Suscipit omnis quam cupiditate esse facere
            similique unde sequi itaque in. Et, nesciunt laboriosam inventore
            magni vel a! Hic a officia consequuntur esse, odio autem eum
            incidunt numquam eius tempore asperiores, magni modi iusto eveniet
            voluptatum sint repellendus minima quisquam unde explicabo?
            Perferendis perspiciatis fugit voluptates veritatis quia.
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ color: theme.palette.text.dark, fontSize: "1.1rem" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            recusandae nemo dolores. Suscipit omnis quam cupiditate esse facere
            similique unde sequi itaque in. Et, nesciunt laboriosam inventore
            magni vel a!
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ mt: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="/about-us.jpeg"
            alt="Our Story Image"
            height={509}
            width={300}
            priority
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: 6,
          mb: 8,
          background: theme.palette.secondary.main,
          color: theme.palette.text.light,
          py: 8,
          width: "100%",
          mx: "auto",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Our Impact in Fashion
        </Typography>
        <Typography
          variant="body1"
          align="center"
          paragraph
          sx={{ color: theme.palette.text.light, fontSize: "1.1rem" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>

        <Box
          sx={{
            borderBottom: "2px solid white",
            width: "50px",
            mb: 4,
            mx: "auto",
          }}
        />

        <Grid container spacing={4} justifyContent="center" sx={{mt: 6}}>
          <Grid size={{ xs: 12, sm: 4}} sx={{ textAlign: "center" }}>
            <SettingsIcon
              sx={{ frontSie: 40, color: theme.palette.text.light, mb: 1 }}
            />
            <Typography vairant="h4" align="center">
              25K
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ color: theme.palette.text.light }}
            >
              Sed pellentesque magna
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: "center" }}>
            <GroupIcon
              sx={{ frontSie: 40, color: theme.palette.text.light, mb: 1 }}
            />
            <Typography vairant="h4" align="center">
              100%
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ color: theme.palette.text.light }}
            >
              Aenean aliquam
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4}} sx={{ textAlign: "center" }}>
            <BusinessIcon
              sx={{ frontSie: 40, color: theme.palette.text.light, mb: 1 }}
            />
            <Typography vairant="h4" align="center">
              120
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ color: theme.palette.text.light }}
            >
              Nullam tristique
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}