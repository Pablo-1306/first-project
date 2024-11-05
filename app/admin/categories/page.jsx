"use client";

import { useState } from "react";
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image';
import { initialProducts } from '../../constants/products/constants';
import Alerts from "@/app/components/alerts";
import CategoryDialog from "@/app/components/category-dialog";
import { useCategories } from "@/app/contexts/category-context";
import Link from "next/link";
import { useProducts } from "@/app/contexts/ProductContext";

export default function CategoriesManager() {
  const theme = useTheme();
  
  // Access to list of categories and CREATE, UPDATE and DELETE functions from the CategoryContext
  const { categories, addCategory, editCategory, deleteCategory } = useCategories();

  // Import products from context ProductsContext
  const {products} = useProducts();

  // State to open or close the alert
  const [openAlert, setOpenAlert] = useState(false);

  // Alert state to show messages to the user when adding a review or product to the cart
  const [alert, setAlert] = useState({
    message: "",
    severity: ""
  });

  // Dialogs states for creating/editing categories 
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  // State to show different titles in Dialog
  const [editMode, setEditMode] = useState(false);

  // Current category state
  const [currentCategory, setCurrentCategory] = useState({
    id: '',
    label: ''
  });

  // Handlers for category dialog
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

  // Handlers close category dialog
  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setCurrentCategory({
      id: '',
      label: ''
    });
  };

  // Function to delete a category 
  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId);
    
    setAlert({
      message: 'Category deleted successfully',
      severity: 'success'
    });
  };

  // Function to give the price input a format
  const formatPrice = (price) => {
    if (!price.startsWith('$')) {
      return `$${price} MXN`;
    }
    return price;
  };

  // Function to filter products by category
  const getProductsByCategory = (categoryLabel) => {
    console.log(products.filter(product => product.category === categoryLabel));
    return products.filter(product => product.category === categoryLabel);
  };

  return (
    <Container maxWidth="lg">
      {/* HEADER */}
      <Container maxWidth='md'>
        <Box maxWidth='md'
          sx={{
            textAlign: 'center',
            my: 10
          }}
        >
            <Typography variant="h3">
                Administrator Page
            </Typography>

            <Grid container sx={{mt: 8}}>
                
            <Grid size={{md: 4}}>
                    <Button 
                      component={Link}
                      href="/admin/inventory"
                      size="large" 
                      sx={{ bgcolor: theme.palette.secondary.main }}
                    >
                      Inventory
                    </Button>
                </Grid>

                <Grid size={{md: 4}}>
                    <Button 
                      component={Link}
                      href="/admin/reviews"
                      size="large" 
                      sx={{ bgcolor: theme.palette.secondary.main }}
                    >
                      Reviews
                    </Button>
                </Grid>

                <Grid size={{md: 4}}>
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

      <Divider sx={{bgcolor: theme.palette.secondary.main}} />

      <Container maxWidth='xl' sx={{mt: 8, mb: 12, textAlign: 'center'}} disableGutters>
        <Typography variant="h3">
          Categories
        </Typography>

        <Button 
          sx={{bgcolor: theme.palette.secondary.main, mt: 4}}
          onClick={() => handleOpenCategoryDialog('add')}
        >
          Add New Category
        </Button>
      
        {categories.map((category) => (
          <Accordion key={category.id} sx={{ mb: 2, mt: 6 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ bgcolor: theme.palette.grey[100] }}
            >
              <Grid container sx={{ width: '100%'}}>
                <Grid size={{xs: 6}} textAlign='left'>
                  <Typography variant="h6">
                    {category.label} ({getProductsByCategory(category.label).length} Products)
                  </Typography>
                </Grid>
                <Grid size={{xs: 6}} textAlign='right'>
                  <Box >
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCategoryDialog('edit', category);
                      }}
                      size="small"
                      sx={{ mr: 6 }}
                    >
                      Edit
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
                      sx={{ mr: 4 }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {getProductsByCategory(category.label).map((product) => (
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
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>


      {/* Dialog to Add/Edit Category*/}
      <CategoryDialog 
        open={openCategoryDialog}
        setOpen={setOpenCategoryDialog}
        onClose={handleCloseCategoryDialog}
        editMode={editMode}
        category={currentCategory}
        setCategory={setCurrentCategory}
        categories={categories}
        addCategory={addCategory}
        editCategory={editCategory}
        setAlert={setAlert}
        setOpenAlert={setOpenAlert}
      />

      <Alerts 
        open={openAlert}
        setOpen={setOpenAlert}
        alert={alert}
      />
    </Container>
  );
}