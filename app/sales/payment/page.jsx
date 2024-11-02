import { Box, Button, Container, Grid, Typography, useTheme } from "@mui/material";

export default function paymentMethods(){
    return(
        <Container disableGutters>
            <Grid container sx={{display:'flex', justifyContent:'center'}}>
                <Grid item>
                    <Typography variant='h4'>
                        Your Payments Methods
                    </Typography>
                    <Box>

                    </Box>
                    <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 4, py: 1.5, bgcolor: '#000000', '&:hover': {
                  bgcolor: '#232222'},
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '1rem'}}>
                  Add credit or debit card
                </Button>
                </Grid>
                <Grid item>
                
                </Grid>
            </Grid>
        </Container>
    )
}