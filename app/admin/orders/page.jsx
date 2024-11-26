"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import axios from "axios";

export default function OrdersPage() {
  const theme = useTheme();

  // Estates
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend load
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/v1/orders");
        setOrders(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
                href="/admin/reviews"
                size="large"
                sx={{ bgcolor: theme.palette.secondary.main }}
              >
                Reviews
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Divider sx={{ bgcolor: theme.palette.secondary.main }} />

      <Container
        maxWidth="xl"
        sx={{ mt: 8, mb: 12, textAlign: "center" }}
        disableGutters
      >
        <Box>
          <Typography variant="h3" gutterBottom>
            Order History
          </Typography>

          {/* LOAD */}
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : orders.length === 0 ? (
            <Typography>No orders found</Typography>
          ) : (

            // HEAD
            orders.map((order) => (
              <Box key={order._id} sx={{ mb: 4 }}>
                <Typography variant="h6">Order #{order._id}</Typography>
                <Typography variant="body1" color="textSecondary">
                  Customer Email: {order.customer_email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {new Date(order.created_at).toLocaleString()}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {order.products.map((item) => (
                  // BODY
                  <Box
                    key={item.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr",
                      alignItems: "center",
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ textAlign: "left" }}>{item.name}</Typography>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "right" }}>
                      Price: ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                <Typography variant="body1" color="textprimary" textAlign={"right"}>
                  Total Price: ${order.total_price.toFixed(2)}
                </Typography>
              </Box>
            ))
          )}

        </Box>
      </Container>
    </Container>
  );
}
