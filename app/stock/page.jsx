"use client";

import React from "react";
import { useState } from "react";
import { Box, Container, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { initialRows } from "../constants/constants"; // Ajusta la ruta .. doble punto
import { handleDelete } from "../constants/constants";
import { handleEdit } from "../constants/constants";

export default function Stock() {
  const [rows, setRows] = useState(initialRows);

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "clothes", headerName: "CLOTHES", flex: 1 },
    { field: "size", headerName: "SIZE", width: 50 },
    { field: "gender", headerName: "GENDER", flex: 1 },
    { field: "description", headerName: "DESCRIPTION", flex: 2 },
    { field: "cantidad", headerName: "CANTIDAD", flex: 1 },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row.id, rows, setRows)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id, rows, setRows)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  //hacemos las configuraciones del container de la tabla
  //

  return (
    <Container maxWidth="xl" disableGutters sx={{ paddingBottom: "50px" }}>
      <Paper
        sx={{
          padding: 5,
          borderRadius: 2,
          maxWidth: "80%",
          margin: "0 auto",
          height: "0 auto", // Asegúrate de que no haya espacio entre "800" y "px"
        }}
      >
        <DataGrid
          columns={columns}
          rows={initialRows}
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
            backgroundColor: "#fcf3cf",
            boxShadow: "2px 2px 2px rgba(1, 50, 1, 2)", // Efecto de sombra
          }}
        />
      </Paper>
    </Container>
  );
}
