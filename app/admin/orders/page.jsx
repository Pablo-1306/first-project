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
        const response = await axios.get("/api/v1/orders"); // Ajusta la URL según tu backend
        setOrders(response.data); // Supongamos que el backend devuelve un array de órdenes
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

          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : orders.length === 0 ? (
            <Typography>No orders found</Typography>
          ) : (
            orders.map((order) => (
              <Box key={order.order_id} sx={{ mb: 4 }}>
                <Typography variant="h6">Order #{order.order_id}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {new Date(order.created_at).toLocaleString()}
                </Typography>
                <Divider sx={{ my: 1 }} />

                {order.products.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 1,
                    }}
                  >
                    <Typography>{item.name}</Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                  </Box>
                ))}
              </Box>
            ))
          )}

        </Box>
      </Container>
    </Container>
  );
}
