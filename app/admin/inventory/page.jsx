"use client";

import React, { useContext } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useProducts } from "@/app/contexts/ProductContext";
import Link from "next/link";
import ProductDialog from "@/app/components/dialog-product";
import Alerts from "@/app/components/alerts";
import axios from "axios";

export default function Stock() {
  const theme = useTheme();

  const { products, addProduct, editProduct, deleteProduct } = useProducts();

  const columns = [
    { field: "_id", headerName: "ID", width: 30 },
    { field: "name", headerName: "PRODUCT", flex: 1 },
    { field: "price", headerName: "PRICE", flex: 1 },
    { field: "category", headerName: "CATEGORIES", flex: 2 },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() =>
              handleProduct({ action: "edit", product: params.row })
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteProduct({ _id: params.row._id })}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const [action, setAction] = useState("");

  const [product, setProduct] = useState({
    _id: "",
    name: "",
    price: "",
    image: "/shirt-test.jpeg",
    category: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    severity: "",
  });

  const handleProduct = ({ action, product }) => {
    setAction(action);
    if (action === "add") {
      setProduct({
        _id: "",
        name: "",
        price: "",
        image: "/shirt-test.jpeg",
      });
    } else if (action === "edit") {
      setProduct(product);
    }
    setOpenDialog(true);
  };

  const handleDeleteProduct = async ({ _id }) => {
    try {
      const response = await axios.delete(`http://localhost:8001/api/v1/products/${_id}`)
      deleteProduct(response.data._id);
      setAlert({
        message: "Product deleted successfully",
        severity: "success",
      });
    }
    catch (error) {
      console.error("Error deleting product: ", error);
      setAlert({
        message: "Failed to delete product",
        severity: "error",
      });
    }
    setOpenAlert(true);
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ paddingBottom: "50px", mt: 6 }}
    >
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

      <Typography variant="h3" textAlign="center" sx={{ mt: 6 }}>
        Inventory
      </Typography>

      <Paper
        sx={{
          padding: 5,
          borderRadius: 2,
          maxWidth: "80%",
          margin: "0 auto",
          height: "0 auto",
          mt: 4,
          mb: 6,
        }}
      >
        <DataGrid
          columns={columns}
          rows={products}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            "& .MuiDataGrid-columnHeaderId": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "2px solid #DDD",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F5F5F5",
            },
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #DDD",
            },

            border: "1px solid  #17202a ",
            backgroundColor: "#ffffff",
            boxShadow: "2px 2px 2px rgba(1, 50, 1, 2)", // Efecto de sombra
          }}
        />
      </Paper>

      <Box textAlign="center">
        <Button
          sx={{ bgcolor: theme.palette.secondary.main }}
          onClick={() => handleProduct({ action: "add", product: product })}
        >
          Add New Product
        </Button>
      </Box>

      <ProductDialog
        open={openDialog}
        setOpen={setOpenDialog}
        product={product}
        setProduct={setProduct}
        products={products}
        addProduct={addProduct}
        editProduct={editProduct}
        setAlert={setAlert}
        setOpenAlert={setOpenAlert}
        action={action}
      />

      <Alerts
        open={openAlert}
        setOpen={setOpenAlert}
        alert={alert}
        setAlert={setAlert}
      />
    </Container>
  );
}
