import React from 'react';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ChekUser = () => {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'white',
                borderRadius: 2,
                padding: 3,
                boxShadow: 3,
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    color: '#00174F',
                    textAlign: 'center',
                    marginBottom: 3,
                    fontWeight: 'bold'
                }}
            >
                Please Log In or Sign Up
            </Typography>

            <Grid container spacing={2} direction="column" alignItems="center">

                <Grid item>
                    <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to="/login"
                        fullWidth
                        sx={{
                            color: '#00174F',
                            borderColor: '#00174F',
                            padding: '12px',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: '#ffffff',
                                borderColor: '#00174F',
                            }
                        }}
                    >
                        Log In
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/signin"
                        fullWidth
                        sx={{
                            backgroundColor: '#00174F',
                            padding: '12px',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: '#ffffff',
                                color: '#00174F',
                            }
                        }}
                    >
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChekUser;
