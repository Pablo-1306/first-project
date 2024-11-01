'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useStore } from '../../context/StoreContext';

export default function AdminCategories() {
  const { categories, products, addProduct, updateProduct, deleteProduct, isClient } = useStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '/shirt-test.jpeg'
  });

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setNewProduct({
      name: '',
      price: '',
      image: '/shirt-test.jpeg'
    });
    setOpenDialog(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteProduct = (productId) => {
    if (selectedCategory) {
      deleteProduct(selectedCategory.id, productId);
    }
  };

  const handleSaveProduct = () => {
    if (selectedCategory) {
      if (selectedProduct) {
        // Editar producto existente
        updateProduct(selectedCategory.id, {
          ...newProduct,
          id: selectedProduct.id
        });
      } else {
        // Crear nuevo producto
        addProduct(selectedCategory.id, newProduct);
      }
      setOpenDialog(false);
      setNewProduct({
        name: '',
        price: '',
        image: '/shirt-test.jpeg'
      });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setNewProduct({
      name: '',
      price: '',
      image: '/shirt-test.jpeg'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Administrator Page
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Button 
            sx={{ 
              mr: 2,
              color: 'black',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            ORDERS
          </Button>
          <Button 
            sx={{ 
              color: 'black',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            REVIEWS
          </Button>
        </Box>

        {!selectedCategory ? (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5">Categories</Typography>
            </Box>

            <List>
              {categories.map((category) => (
                <ListItem
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: 1,
                    mb: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'grey.50'
                    }
                  }}
                >
                  <ListItemText 
                    primary={category.name}
                    secondary={isClient ? `Products: ${products[category.id]?.length || 0}` : 'Loading...'}
                  />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton 
                  onClick={() => setSelectedCategory(null)}
                  sx={{ mr: 2, color: 'black' }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5">
                  {selectedCategory.name} Products
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={handleAddProduct}
                sx={{ 
                  bgcolor: 'black',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#333'
                  }
                }}
              >
                Add New Product
              </Button>
            </Box>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: 3 
            }}>
              {(products[selectedCategory.id] || []).map((product) => (
                <Paper 
                  key={product.id}
                  elevation={1}
                  sx={{ 
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ 
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      mb: 2,
                      borderRadius: 1
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 1 }}>{product.name}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>{product.price}</Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1,
                    mt: 'auto'
                  }}>
                    <IconButton 
                      onClick={() => handleEditProduct(product)}
                      sx={{ color: 'black' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeleteProduct(product.id)}
                      sx={{ color: 'black' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
            </Box>
          </>
        )}
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="$2,200.00 MXN"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog}
            sx={{ color: 'black' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveProduct}
            variant="contained"
            disabled={!newProduct.name || !newProduct.price}
            sx={{ 
              bgcolor: 'black',
              color: 'white',
              '&:hover': {
                bgcolor: '#333'
              }
            }}
          >
            {selectedProduct ? 'Save Changes' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}