import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

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
  const saveCategory = () => {
    if (!category.label) {
      setAlert({
        message: "Please enter a name for the category",
        severity: "error",
      });
      return;
    }

    // If editMode is true, update the category
    if (editMode) {
      editCategory(category);
    } else {
      // If editMode is false, add a new category
      category.id = categories.length + 1;
      addCategory(category);
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
          name="label"
          label="Category Name"
          type="text"
          fullWidth
          value={category.label}
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
