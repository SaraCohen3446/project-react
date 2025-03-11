import React from 'react';
import { Button, Container, Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ChekForOrder = () => {
    console.log("ChekForOrder");
    
    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                padding={3}
                border={1}
                borderColor="grey.400"
                borderRadius={2}
                boxShadow={3}
            >
                <Typography variant="h4" gutterBottom>
                    היכנס או הירשם
                </Typography>

                <Grid container spacing={2} direction="column" alignItems="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/login"
                            fullWidth
                        >
                            התחבר
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            variant="outlined"
                            color="primary"
                            component={Link}
                            to="/signin"
                            fullWidth
                        >
                            הירשם
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ChekForOrder;
