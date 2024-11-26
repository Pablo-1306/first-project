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
import Alerts from "../../components/alerts";
import { useState } from "react";
import axios from "axios";

// Reviews page accessed at /admin/reviews
export default function Reviews() {
  const theme = useTheme();

  //Give us access to the reviews and the deleteReview function from the ReviewContext
  const { reviews, deleteReview } = useReviews();

  // State to open or close the alert
  const [openAlert, setOpenAlert] = useState(false);

  // Alert state to show messages to the user when adding a review or product to the cart
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
  });


  const handleDelete = async (review_id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/reviews/${review_id}`);
      deleteReview(review_id);
      setAlert({
        message: "Review deleted successfully",
        severity: "success",
      });
    } catch (error) {
      setAlert({
        message: "Failed to delete the review",
        severity: "error",
      });
      console.error("Error deleting review: ", error);
    }
    setOpenAlert(true); // Open the alert
  }

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
          <Box key={review._id}>
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
                  onClick={() => handleDelete(review._id)}
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
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />
    </Container>
  );
}
