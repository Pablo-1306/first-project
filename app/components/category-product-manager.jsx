"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Image from "next/image";
import { initialProducts } from '../constants/products/constants';

export default function CategoryProducts({ categoryId }) {
  // Filtrar productos solo de la categoría específica
  const [products, setProducts] = useState(
    initialProducts.filter(product => product.category === categoryId)
  );

  // Estados para el diálogo
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    price: '',
    image: '/shirt-test.jpeg',
    category: categoryId
  });

  // Estado para notificaciones
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleOpenDialog = (mode, product = null) => {
    setEditMode(mode === 'edit');
    if (product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct({
        id: String(Date.now()),
        name: '',
        price: '',
        image: '/shirt-test.jpeg',
        category: categoryId
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct({
      id: '',
      name: '',
      price: '',
      image: '/shirt-test.jpeg',
      category: categoryId
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatPrice = (price) => {
    if (!price.startsWith('$')) {
      return `$${price} MXN`;
    }
    return price;
  };

  const handleSaveProduct = () => {
    if (!currentProduct.name || !currentProduct.price) {
      setSnackbar({
        open: true,
        message: 'Por favor completa todos los campos requeridos',
        severity: 'error'
      });
      return;
    }

    const formattedProduct = {
      ...currentProduct,
      price: formatPrice(currentProduct.price)
    };

    if (editMode) {
      setProducts(prev => 
        prev.map(product => 
          product.id === currentProduct.id ? formattedProduct : product
        )
      );
      setSnackbar({
        open: true,
        message: 'Producto actualizado exitosamente',
        severity: 'success'
      });
    } else {
      setProducts(prev => [...prev, formattedProduct]);
      setSnackbar({
        open: true,
        message: 'Producto agregado exitosamente',
        severity: 'success'
      });
    }
    handleCloseDialog();
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    setSnackbar({
      open: true,
      message: 'Producto eliminado exitosamente',
      severity: 'success'
    });
  };

  const getCategoryTitle = () => {
    switch(categoryId) {
      case 'men':
        return 'Productos para Hombre';
      case 'women':
        return 'Productos para Mujer';
      case 'child':
        return 'Productos para Niños';
      default:
        return 'Productos';
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {getCategoryTitle()}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('add')}
          sx={{ mb: 4 }}
        >
          Agregar Producto
        </Button>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Box 
                sx={{ 
                  p: 2, 
                  border: '1px solid #ddd', 
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <Box sx={{ position: 'relative', width: '100%', paddingTop: '133%' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ 
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2, flexGrow: 1 }}>
                  <Typography variant="h6">
                    {product.name}
                  </Typography>
                  <Typography variant="body1">
                    {product.price}
                  </Typography>
                </Box>
                <Box sx={{ 
                  mt: 2, 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  borderTop: '1px solid #eee',
                  paddingTop: 1
                }}>
                  <IconButton
                    onClick={() => handleOpenDialog('edit', product)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteProduct(product.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Diálogo para Agregar/Editar */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editMode ? 'Editar Producto' : 'Nuevo Producto'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre del Producto"
            type="text"
            fullWidth
            value={currentProduct.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="price"
            label="Precio"
            type="text"
            fullWidth
            value={currentProduct.price}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            helperText="Formato: $1,000.00 MXN"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveProduct} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}