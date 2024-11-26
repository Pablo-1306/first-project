"use client";

import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useProducts } from "../contexts/ProductContext";

export default function CategoryProducts({ categoryId }) {

  // Import products from context ProductsContext
  const { products } = useProducts();
  
  const productsCat = products.filter(
    (product) => product.category === categoryId,
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 6, mb: 12 }}>
      <Typography variant="h3" sx={{ mb: 4 }} textAlign="center">
        {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Collection
      </Typography>

      <Grid container spacing={3}>
        {productsCat.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 1,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "133%",
                  mb: 2,
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {product.price}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
