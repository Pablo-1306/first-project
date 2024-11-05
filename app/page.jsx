"use client";

import { Box, Container, Divider, Paper, Typography, useTheme } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { initialProducts } from "./constants/products/constants";
import { useCategories } from "./contexts/category-context";
import { useProducts } from "./contexts/ProductContext";

export default function Home() {
  const theme = useTheme();

  const { categories } = useCategories();
  //Delete in the future when added context for categories:
  //const [categories, setCategories] = useState(initialCategories);

  //Delete in the future when added context for products:
  //const [products, setProducts] = useState(initialProducts);

  // Import products from context ProductsContext
  const {products} = useProducts();

  return (
    <Container disableGutters maxWidth='xxl'>

      {/* BANNER */}
      <Container maxWidth="xxl"
        sx={{
          height: 723,
          width: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url('/banner-home.jpeg')`,
          backgroundPosition: "center 60%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
      </Container>
      
      {/* CATEGORIES */}
      <Container maxWidth='xl'>
        <Grid container
          sx={{
            display: "flex", 
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: 'center',
            mt:{xs: 3, sm: 0},
            my:{sm: 6}
          }}
        >
          {categories.map(category => (
            <Grid size={{xs: 12, sm: 2}} key={category.label}
              sx={{
                mb: {xs: 3, sm: 0}
              }}
            >
              <Typography component={Link} 
              href={`/categories/${category.label}`}
              color={theme.palette.text.dark}
              sx={{textDecoration: 'underline'}}
              >
                {category.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider color='black'/>
      
      {/* PRODUCTS */}
      <Container maxWidth="xl" sx={{mt: 10}}>
        <Grid container>
          {products.map(product => (
            <Grid size={{xs: 12, md: 6, lg: 3}} key={product.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 8
              }}
            >
              <Box
                sx={{
                  textDecoration: 'none',
                  width: 240
                }}
              >
                <Box component={Link} href={`/products/${product.id}`}>
                  <Image src={product.image} width='240' height='320'/>
                </Box>
                <Typography variant="subtitle2" color={theme.palette.text.dark}>
                  {product.name}
                </Typography>
                <Typography variant="caption" color={theme.palette.text.dark}>
                  {product.price}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* SECOND BANNER */}
      <Box
        sx={{
          width: "100%",
          height: 0,
          paddingTop: "45.35%", // Aspect ratio (height / width) * 100%
          backgroundImage: `url('/banner-home2.jpeg')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
      </Box>

      {/* STORE DESCRIPTION */}
      <Container maxWidth='md' sx={{my: 12}}>
        <Typography variant="h3" textAlign='center'
          sx={{
            fontFamily: "Grenze Gotisch",
            fontWeight: 700,
            mb: 4
          }}
        >
          TiendaRopa
        </Typography>
        <Typography variant="body1" textAlign='center'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, totam reprehenderit numquam quos perferendis ipsam 
          eos nam recusandae eum at, facilis ex, dolor ea obcaecati quasi explicabo iure sint magnam.
        </Typography>
      </Container>

    </Container>
  );
}
