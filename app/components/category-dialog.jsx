import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function CategoryDialog({
  open,
  setOpen,
  editMode,
  category,
  setCategory,
  categories,
  addCategory,
  editCategory,
  setAlert,
  setOpenAlert,
}) {
  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Function to handle the change of the category state
  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  // Function to save category
  const saveCategory = async () => {
    if (!category.name) {
      setAlert({
        message: "Please enter a name for the category",
        severity: "error",
      });
      return;
    }

    // If editMode is true, update the category
    if (editMode) {
      try{
        const response = await axios.put(`http://localhost:8003/api/v1/categories/${category._id}`, category);
        editCategory(category);
      }
      catch (error){
        setAlert({
          message: "Failed to update category",
          severity: "error",
        });
      }
    } else {
      // If editMode is false, add a new category
      try{
        const response = await axios.post('http://localhost:8003/api/v1/categories', category);
        response.data._id = categories.length + 1;
        addCategory(category);
      }
      catch (error){
        console.error('Error adding category: ', error);
        setAlert({
          message: "Failed to add category",
          severity: "error",
        });
      }
    }

    setAlert({
      message: editMode
        ? "Category updated successfully"
        : "Category added successfully",
      severity: "success",
    });
    setOpenAlert(true);
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>{editMode ? "Edit Category" : "New Category"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Category Name"
          type="text"
          fullWidth
          value={category.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={saveCategory} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
