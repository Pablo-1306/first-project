import React from "react";
import { useCart } from "../contexts/CartContext";
import { Box, Typography, Button, Divider } from "@mui/material";

export default function CartView() {
  const { cart, removeFromCart, clearCart, createOrder } = useCart();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {/* Products in cart */}
      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <Box>
          {cart.map((item) => (
            <Box key={item.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="body1" sx={{ flex: 1 }}>
                {item.name}
              </Typography>
              <Typography variant="body1" sx={{ flex: 1 }}>
                Quantity: {item.quantity}
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          
          {/* Clear Cart and Buy Cart */}
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button variant="contained" color="primary" onClick={createOrder}>
              Buy Cart
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
