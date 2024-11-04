"use client";

import { useState } from "react";
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  IconButton, 
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
  Alert,
  Grid,
  Fab
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { initialProducts } from '../../constants/products/constants';
import Image from 'next/image';

export default function CategoriesManager() {
  const theme = useTheme();
  
  // Estado para categorías
  const [categories, setCategories] = useState([
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'child', label: 'Child' }
  ]);

  // Estado para productos
  const [products, setProducts] = useState(
    initialProducts.map(product => ({
      ...product,
      category: 'men'
    }))
  );

  // Estados para diálogos
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // Estados para elementos actuales
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    price: '',
    image: '/shirt-test.jpeg',
    category: ''
  });

  const [currentCategory, setCurrentCategory] = useState({
    id: '',
    label: ''
  });

  // Estado para notificaciones
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Manejadores para diálogo de categorías
  const handleOpenCategoryDialog = (mode, category = null) => {
    setEditMode(mode === 'edit');
    if (category) {
      setCurrentCategory(category);
    } else {
      setCurrentCategory({
        id: String(Date.now()),
        label: ''
      });
    }
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setCurrentCategory({
      id: '',
      label: ''
    });
  };

  const handleSaveCategory = () => {
    if (!currentCategory.label) {
      setSnackbar({
        open: true,
        message: 'Por favor ingresa un nombre para la categoría',
        severity: 'error'
      });
      return;
    }

    if (editMode) {
      setCategories(prev => 
        prev.map(cat => 
          cat.id === currentCategory.id ? currentCategory : cat
        )
      );
    } else {
      setCategories(prev => [...prev, {
        ...currentCategory,
        id: currentCategory.label.toLowerCase().replace(/\s+/g, '-')
      }]);
    }

    setSnackbar({
      open: true,
      message: editMode ? 'Categoría actualizada exitosamente' : 'Categoría agregada exitosamente',
      severity: 'success'
    });
    handleCloseCategoryDialog();
  };

  const handleDeleteCategory = (categoryId) => {
    // Eliminar la categoría y sus productos
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    setProducts(prev => prev.filter(prod => prod.category !== categoryId));
    
    setSnackbar({
      open: true,
      message: 'Categoría y sus productos eliminados exitosamente',
      severity: 'success'
    });
  };

  // Manejadores para diálogo de productos
  const handleOpenProductDialog = (mode, categoryId, product = null) => {
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
    setOpenProductDialog(true);
  };

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
    setCurrentProduct({
      id: '',
      name: '',
      price: '',
      image: '/shirt-test.jpeg',
      category: ''
    });
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'category') {
      setCurrentCategory(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setCurrentProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
    } else {
      setProducts(prev => [...prev, formattedProduct]);
    }

    setSnackbar({
      open: true,
      message: editMode ? 'Producto actualizado exitosamente' : 'Producto agregado exitosamente',
      severity: 'success'
    });
    handleCloseProductDialog();
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    setSnackbar({
      open: true,
      message: 'Producto eliminado exitosamente',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.category === categoryId);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3">
          Administrador de Categorías y Productos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenCategoryDialog('add')}
        >
          Nueva Categoría
        </Button>
      </Box>

      {categories.map((category) => (
        <Accordion key={category.id} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: theme.palette.grey[100] }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={6}>
                <Typography variant="h6">
                  {category.label} ({getProductsByCategory(category.id).length} productos)
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  size="small"
                  sx={{ mr: 1 }}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteOutlinedIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(category.id);
                  }}
                  size="small"
                  sx={{ mr: 1 }}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenProductDialog('add', category.id);
                  }}
                  size="small"
                >
                  Agregar Producto
                </Button>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {getProductsByCategory(category.id).map((product) => (
                <ListItem
                  key={product.id}
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: 'background.paper'
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    style={{
                      marginRight: '16px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                  <ListItemText
                    primary={product.name}
                    secondary={product.price}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleOpenProductDialog('edit', category.id, product)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Diálogo para Agregar/Editar Categoría */}
      <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
        <DialogTitle>
          {editMode ? 'Editar Categoría' : 'Nueva Categoría'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="label"
            label="Nombre de la Categoría"
            type="text"
            fullWidth
            value={currentCategory.label}
            onChange={(e) => handleInputChange(e, 'category')}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCategoryDialog}>Cancelar</Button>
          <Button onClick={handleSaveCategory} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para Agregar/Editar Producto */}
      <Dialog open={openProductDialog} onClose={handleCloseProductDialog}>
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
            onChange={(e) => handleInputChange(e, 'product')}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="price"
            label="Precio"
            type="text"
            fullWidth
            value={currentProduct.price}
            onChange={(e) => handleInputChange(e, 'product')}
            sx={{ mb: 2 }}
            helperText="Formato: $1,000.00 MXN"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProductDialog}>Cancelar</Button>
          <Button onClick={handleSaveProduct} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}