import React from 'react';
import { Container, Box, Typography, Grid, Button } from '@mui/material'; 
import { Link } from 'react-router-dom'; 

const ChekForOrder = () => {
    return (
        // Box משמש ליצירת קונטיינר עם עיצוב מותאם אישית
        <Box
            sx={{
                width: '100%',              // הגדרת רוחב מלא
                maxWidth: '400px',          // הגבלת רוחב מקסימלי ל-400px
                backgroundColor: 'white',   // הגדרת צבע רקע לבן
                borderRadius: 2,            // גבולות מעוגלים בקוטר 2
                padding: 3,                 // ריפוד פנימי בגודל 3
                boxShadow: 3,               // צל סביב הקונטיינר
            }}
        >
            {/* כותרת ראשית עם הסבר למשתמש */}
            <Typography 
                variant="h5" 
                sx={{ 
                    color: '#00174F',                // צבע טקסט כחול כהה
                    textAlign: 'center',             // טקסט ממורכז
                    marginBottom: 3,                 // רווח תחתון בין הכותרת לכפתורים
                    fontWeight: 'bold'               // טקסט בולט
                }}
            >
                Please Log In or Sign Up
            </Typography>

            {/* Grid מיישם סידור ושטח בין כפתורים */}
            <Grid container spacing={2} direction="column" alignItems="center">
                
                {/* כפתור התחברות */}
                <Grid item>
                    <Button
                        variant="outlined"           // כפתור עם גבול
                        color="primary"               // צבע הכפתור כחול כהה
                        component={Link}              // הופך את הכפתור לקישור
                        to="/login"                   // ניווט לעמוד התחברות
                        fullWidth                     // כפתור ברוחב מלא
                        sx={{
                            color: '#00174F',            // צבע הכיתוב כחול כהה
                            borderColor: '#00174F',      // צבע הגבול כחול כהה
                            padding: '12px',             // ריפוד בתוך הכפתור
                            fontWeight: 'bold',          // טקסט בולט
                            borderRadius: '4px',         // גבולות מעוגלים
                            '&:hover': {                 // עיצוב בהובר
                                backgroundColor: '#ffffff',  // צבע רקע בהובר
                                borderColor: '#00174F',      // צבע גבול בהובר
                            }
                        }}
                    >
                        Log In
                    </Button>
                </Grid>

                {/* כפתור הרשמה */}
                <Grid item>
                    <Button
                        variant="contained"          
                        color="primary"               
                        component={Link}           
                        to="/signin"                 
                        fullWidth                     // כפתור ברוחב מלא
                        sx={{
                            backgroundColor: '#00174F', // צבע הרקע כחול כהה
                            padding: '12px',            // ריפוד בתוך הכפתור
                            fontWeight: 'bold',         // טקסט בולט
                            borderRadius: '4px',        // גבולות מעוגלים
                            '&:hover': {                // עיצוב בהובר
                                backgroundColor: '#ffffff',  // צבע רקע בהובר
                                color: '#00174F',            // צבע הטקסט בהובר
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

export default ChekForOrder;
