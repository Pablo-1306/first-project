"use client";

import { useTheme } from "@emotion/react";
import { Box, Button, Container, Typography, Divider, Rating } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useState } from "react";
import { useReviews } from "../contexts/ReviewContext";
import ReviewDialog from "../components/review-dialog";

export default function IndividualProduct() {

    const theme = useTheme();

    const {reviews, addReview} = useReviews();

    const [review, setReview] = useState({
        id: '',
        user: '',
        review: '',
        rating: 0
    });

    const [count, setCount] = useState(1);
    const handleIncrement = () => setCount(count + 1);
    const handleDecrement = () => setCount(count > 0 ? count - 1 : 0);

    const [openDialog, setOpenDialog] = useState(false);

    const handleReview = () => {
        setOpenDialog(true);
        setReview({
            id: '',
            user: '',
            review: '',
            rating: 0
        });
    }

    return (
        <Container maxWidth='xl' sx={{my: 10}}>

            {/* INDIVIDUAL PRODUCT */}
            <Container maxWidth='lg' sx={{mb: 8}}>
                <Grid container>

                    <Grid size={{md: 6}}>
                        <Image src='/shirt-test.jpeg' width='511' height='681' alt="shirt image"/>
                    </Grid>

                    <Grid size={{md: 6}} sx={{pl: 14}}>
                        <Typography variant="h3">
                            Blue Shirt
                        </Typography>
                        <Typography variant="body1" sx={{mt: 1}}>
                            $2,200.00 MXN
                        </Typography>

                        {/* Qty selection button */}
                        <Box display="flex" alignItems="center" justifyContent="center"
                            sx={{
                                border: '1px solid black',
                                borderRadius: 1,
                                p: 1,
                                width: 400,
                                height: 40,
                                mt: 5
                            }}
                        >
                            <Button onClick={handleDecrement} disabled={count === 1} color={theme.palette.secondary.main}>
                                -
                            </Button>
                            <Typography variant="body1" mx={2}>
                                {count}
                            </Typography>
                            <Button onClick={handleIncrement} color={theme.palette.secondary.main}>
                                +
                            </Button>
                        </Box>

                        <Button color={theme.palette.secondary.main}
                            sx={{
                                border: '1px solid black',
                                borderRadius: 1,
                                mt: 7,
                                width: 400,
                                height: 40
                            }}
                        >
                            Add to Cart
                        </Button>

                    </Grid>
                </Grid>
            </Container>

            <Divider color={theme.palette.secondary.main}/>

            {/* REVIEWS */}
            <Container maxWidth='lg' sx={{mb: 8}}>
                <Typography variant="h3" sx={{mt: 3, mb: 6}}>
                    Reviews
                </Typography>

                {reviews.map(review => (
                    <Grid container key={review.id} sx={{borderBottom: '1px solid black', mt: 2}}>
                        <Grid size={{md: 8}}>
                            <Typography variant="body2">
                                {review.review}
                            </Typography>
                            <Typography variant="body2" sx={{my: 2}}>
                                <b>User:</b> {review.user}
                            </Typography>
                        </Grid>

                        <Grid size={{md: 4}} textAlign='right'>
                            <Rating 
                                value={review.rating}
                                readOnly
                                size="large"
                            />
                        </Grid>
                    </Grid>
                ))}

                <Button onClick={() => handleReview()}
                    sx={{bgcolor: theme.palette.secondary.main, height: 40, width: 180, mt: 6}}
                >
                    Write a Review
                </Button>

            </Container>

            <ReviewDialog  open={openDialog} setOpen={setOpenDialog} review={review} 
                setReview={setReview} reviews={reviews} addReview={addReview}
            />
        </Container>
    )
}