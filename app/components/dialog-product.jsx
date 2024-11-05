import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";
import { theme } from "../styles/global-theme";

export default function ProductDialog({
  open,
  setOpen,
  product,
  setProduct,
  products,
  addProduct,
  editProduct,
  setAlert,
  setOpenAlert,
  action,
}) {
  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Function to handle the change of the product state
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Function to save the product
  const saveReview = () => {
    if (action === "add") {
      product.id = String(products.length + 1);
      product.image = "/shirt-test.jpeg";
      addProduct(product); // Add the product to the list of products
      setAlert({
        message: "Product added successfully",
        severity: "success",
      });
      console.log(product);
      setOpenAlert(true); // Open the alert
    } else if (action === "edit") {
      editProduct(product);
      setAlert({
        message: "Product updated successfully",
        severity: "success",
      });
      setOpenAlert(true); // Open the alert
    }
    handleCloseDialog(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>
        {action === "add" ? "Add Product" : "Edit Product"}
      </DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Product Name"
          margin="normal"
          fullWidth
          value={product.name}
          onChange={handleChange}
          color={theme.palette.secondary.main}
        />
        <TextField
          name="price"
          label="Price"
          margin="normal"
          fullWidth
          value={product.price}
          onChange={handleChange}
          color={theme.palette.secondary.main}
        />
        <TextField
          name="category"
          label="Category"
          margin="normal"
          fullWidth
          value={product.category}
          onChange={handleChange}
          color={theme.palette.secondary.main}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={saveReview}
          color="primary"
          sx={{ bgcolor: theme.palette.secondary.main }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
