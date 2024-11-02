import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField } from "@mui/material";
import { theme } from "../styles/global-theme";

export default function ReviewDialog({open, setOpen, review, setReview, reviews, addReview}) {
    const handleCloseDialog = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
    }

    const saveReview = () => {
        review.id = reviews.length + 1;
        review.product = 'id 1';
        addReview(review);
        console.log('review', review);
        handleCloseDialog();
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
                />
                <TextField 
                    name="user"
                    label="User"
                    margin="normal"
                    fullWidth
                    value={review.user}
                    onChange={handleChange}
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