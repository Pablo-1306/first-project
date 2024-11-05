"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useReviews } from "@/app/contexts/ReviewContext";
import Link from "next/link";

// Reviews page accessed at /admin/reviews
export default function Reviews() {
  const theme = useTheme();

  //Give us access to the reviews and the deleteReview function from the ReviewContext
  const { reviews, deleteReview } = useReviews();

  return (
    <Container maxWidth="lg">
      {/* HEADER */}
      <Container maxWidth="md">
        <Box
          maxWidth="md"
          sx={{
            textAlign: "center",
            my: 10,
          }}
        >
          <Typography variant="h3">Administrator Page</Typography>

          <Grid container sx={{ mt: 8 }}>
            <Grid size={{ md: 4 }}>
              <Button
                component={Link}
                href="/admin/inventory"
                size="large"
                sx={{ bgcolor: theme.palette.secondary.main }}
              >
                Inventory
              </Button>
            </Grid>

            <Grid size={{ md: 4 }}>
              <Button
                component={Link}
                href="/admin/categories"
                size="large"
                sx={{ bgcolor: theme.palette.secondary.main }}
              >
                Categories
              </Button>
            </Grid>

            <Grid size={{ md: 4 }}>
              <Button
                component={Link}
                href="/admin/orders"
                size="large"
                sx={{ bgcolor: theme.palette.secondary.main }}
              >
                Orders
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Divider sx={{ bgcolor: theme.palette.secondary.main }} />

      {/* REVIEWS */}
      <Container
        maxWidth="xl"
        sx={{ mt: 8, mb: 12, textAlign: "center" }}
        disableGutters
      >
        <Typography variant="h3">Reviews</Typography>

        {reviews.map((review) => (
          <Box key={review.id}>
            <Grid container sx={{ mt: 6, mb: 3 }}>
              <Grid size={{ md: 10 }} sx={{ textAlign: "left" }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <b>User:</b> {review.user}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <b>Product:</b> {review.product}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <b>Review:</b> {review.review}
                </Typography>
                <Typography variant="body1">
                  <b>Rating:</b> {review.rating}
                </Typography>
              </Grid>

              <Grid
                size={{ md: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => deleteReview(review.id)}
                >
                  <DeleteOutlinedIcon
                    fontSize="inherit"
                    sx={{ color: theme.palette.secondary.main }}
                  />
                </IconButton>
              </Grid>
            </Grid>

            <Divider sx={{ bgcolor: theme.palette.secondary.main }} />
          </Box>
        ))}
      </Container>
    </Container>
  );
}
