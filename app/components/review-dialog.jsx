import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField } from "@mui/material";
import { theme } from "../styles/global-theme";

export default function ReviewDialog({open, setOpen, review, setReview, reviews, addReview, productId}) {

    // Function to close the dialog
    const handleCloseDialog = () => {
        setOpen(false);
    }

    // Function to handle the change of the review state
    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
    }

    // Function to save the review
    const saveReview = () => {
        review.id = reviews.length + 1;
        review.product = productId;
        addReview(review); // Add the review to the list of reviews
        handleCloseDialog(); // Close the dialog
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>Add Review</DialogTitle>
            <DialogContent>
                <TextField 
                    name="review"
                    label="Review"
                    margin="normal"
                    fullWidth
                    value={review.review}
                    onChange={handleChange}
                    color={theme.palette.secondary.main}
                />
                <TextField 
                    name="user"
                    label="User"
                    margin="normal"
                    fullWidth
                    value={review.user}
                    onChange={handleChange}
                    color={theme.palette.secondary.main}
                />
                <Rating 
                    name="rating"
                    value={review.rating}
                    onChange={handleChange}
                    size="large"
                    sx={{mt: 2}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color='secondary'>
                    Cancel
                </Button>
                <Button onClick={saveReview} color='primary' sx={{bgcolor: theme.palette.secondary.main}}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}