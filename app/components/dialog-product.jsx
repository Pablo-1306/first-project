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
import axios from "axios";

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
  const saveProduct = async () => {
    if (action === "add") {
      try{
        const response = await axios.post("http://localhost:8001/api/v1/products", product);
        response.data._id = products.length + 1;
        addProduct(response.data); // Add the product to the list of products
        setAlert({
          message: "Product added successfully",
          severity: "success",
        });
      }
      catch (error){
        console.error("Error adding product: ", error);
        setAlert({
          message: "Failed to add product",
          severity: "error",
        });
      }
    } else if (action === "edit") {
      try {
        const response = await axios.put(`http://localhost:8001/api/v1/products/${product._id}`, product);
        response.data._id = product._id;
        response.data.image = product.image;
        editProduct(response.data); // Edit the product in the list of products
        setAlert({
          message: "Product updated successfully",
          severity: "success",
        });
      }
      catch (error) {
        console.error("Error updating product: ", error);
        setAlert({
          message: "Failed to update product",
          severity: "error",
        });
      }
    }
    setOpenAlert(true); // Open the alert
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
          onClick={saveProduct}
          color="primary"
          sx={{ bgcolor: theme.palette.secondary.main }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
