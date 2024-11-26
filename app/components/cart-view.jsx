import React from "react";
import { useCart } from "../contexts/CartContext";
import { Box, Typography, Button, Divider } from "@mui/material";
import axios from "axios";

export default function CartView() {
  const { cart, removeFromCart, clearCart } = useCart();

  const createOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty. Cannot create an order.");
      return;
    }
  
    try {
      const cleanCart = cart.map(({ id, name, price, quantity }) => ({
        id,
        name,
        price: parseFloat(price),
        quantity,
      }));
  
      console.log("Cleaned cart:", cleanCart);
  
      const response = await axios.post("http://127.0.0.1:5000/api/v1/orders", {
        customer_email: "customer@example.com",
        products: cleanCart,
      });

      console.log("Order created:", response.data);
      clearCart();
      alert("Order created successfully!");
    } catch (err) {
      console.error("Failed to create order:", err.message);
      alert("Failed to create order. Please try again.");
    }
  };  

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
            <Box
              key={item.id}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <Typography variant="body1" sx={{ flex: 1 }}>
                {item.name}
              </Typography>
              <Typography variant="body1" sx={{ flex: 1 }}>
                Quantity: {item.quantity}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeFromCart(item.id)}
              >
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
