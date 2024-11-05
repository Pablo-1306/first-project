"use client";

import React from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  Button,
  useTheme,
} from "@mui/material";
import { useOrder } from "@/app/contexts/OrderContext";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

export default function OrdersPage() {
  const theme = useTheme();

  const { orders } = useOrder();

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

          {orders.length === 0 ? (
            <Typography>No orders found</Typography>
          ) : (
            orders.map((order) => (
              <Box key={order.id} sx={{ mb: 4 }}>
                <Typography variant="h6">Order #{order.id}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {new Date(order.date).toLocaleString()}
                </Typography>
                <Divider sx={{ my: 1 }} />

                {order.items.map((item) => (
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
