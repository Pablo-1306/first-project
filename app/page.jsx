'use client';

import { Box, Container, Divider, Typography, useTheme } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { useStore } from './context/StoreContext';

export default function Home() {
  const theme = useTheme();
  const { categories, products } = useStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const displayedProducts = selectedCategoryId 
    ? products[selectedCategoryId] || []
    : Object.values(products).flat();

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
      />
      
      {/* CATEGORIES */}
      <Container maxWidth='xl'>
        <Grid container textAlign='center'
          sx={{
            display: "flex", 
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            mt:{xs: 3, sm: 0},
            my:{sm: 6}
          }}
        >
          {categories.map((category) => (
            <Grid 
              key={category.id}
              size={{xs: 12, sm: 2}}
              sx={{
                mb: {xs: 3, sm: 0}
              }}
            >
              <Typography 
                onClick={() => setSelectedCategoryId(
                  selectedCategoryId === category.id ? null : category.id
                )}
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: selectedCategoryId === category.id ? 'primary.main' : theme.palette.text.dark,
                  fontWeight: selectedCategoryId === category.id ? 'bold' : 'normal',
                  '&:hover': {
                    color: 'primary.main',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {category.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider color='black'/>
      
      {/* PRODUCTS */}
      <Container maxWidth="xl" sx={{mt: 10}}>
        <Grid container>
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <Grid 
                key={product.id}
                size={{xs: 12, md: 6, lg: 3}}
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
                  <Box component={Link} href='/'>
                    <Image 
                      src={product.image} 
                      width={240} 
                      height={320}
                      alt={product.name}
                    />
                  </Box>
                  <Typography variant="subtitle2" color={theme.palette.text.dark}>
                    {product.name}
                  </Typography>
                  <Typography variant="caption" color={theme.palette.text.dark}>
                    {product.price}
                  </Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Box sx={{ 
              width: '100%', 
              textAlign: 'center', 
              py: 8 
            }}>
              <Typography variant="h6" color="text.secondary">
                {selectedCategoryId 
                  ? "No products available in this category yet"
                  : "No products available yet"}
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>

      {/* SECOND BANNER */}
      <Box
        sx={{
          width: "100%",
          height: 0,
          paddingTop: "45.35%",
          backgroundImage: `url('/banner-home2.jpeg')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      {/* STORE DESCRIPTION */}
      <Container textAlign='center' maxWidth='md' sx={{my: 12}}>
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