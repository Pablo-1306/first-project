"use client";

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Inventory() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>OPCIONES DE ADMINISTRADOR</h1>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          component={Link}
          href="/stock    "
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          style={{ margin: "15px" }}
        >
          STOCK
        </Button>

        <Button
          component={Link}
          href="/page.jsx"
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          style={{ margin: "15px" }}
        >
          ORDENES
        </Button>

        <Button
          component={Link}
          href="/page.jsx"
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          style={{ margin: "15px" }}
        >
          PAGOS
        </Button>
      </Box>
    </Box>
  );
}
