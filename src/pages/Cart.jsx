import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, reduce, addItem } from '../features/OrderSlice.js';
import { Container, Typography, IconButton, Box, Paper, Divider, Grid, Button, Modal } from '@mui/material';
import { Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import ChekUser from './ChekUser.jsx';

const Cart = () => {
    const cart = useSelector((state) => state.cart.arr || []);  // קבלת המוצרים מהקופה
    const totalPrice = useSelector((state) => state.cart.sum);  // סך המחיר של כל המוצרים בקופה
    const currentUser = useSelector((st) => st.user.user);  // קבלת המשתמש הנוכחי
    const dispatch = useDispatch();  // הפונקציות של ה-Redux
    const navigate = useNavigate();  // ניווט לעמודים אחרים

    const [isCChekUserOpen, setCChekUserOpen] = useState(false); // מצב לפתיחת ChekUser

    const handleRemove = (id) => {
        dispatch(removeItem({ _id: id }));  // הסרת פריט מהקופה
    };

    const handleReduce = (id) => {
        dispatch(reduce({ _id: id }));  // צמצום כמות פריט בקופה
    };

    const handleAdd = (item) => {
        dispatch(addItem(item));  // הוספת פריט לקופה
    };

    // פונקציה שמבצעת את הפעולה כשאין currentUser
    const handleChekUser = () => {
        if (!currentUser) {
            setChekUserOpen(true);  // פותח את חלון ההזמנה אם אין משתמש
        } else {
            navigate("/orderForm")  // אם יש משתמש, מנווט לעמוד פרטי ההזמנה
        }
    };

    return (
        <Container maxWidth={false} sx={{ top: "0px", height: "600px", }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#00174F', textAlign: 'center', fontWeight: 'bold' }}>
                Shopping Cart
            </Typography>
            {cart.length === 0 ? (
                <Typography variant="h6" color="textSecondary" align="center">
                    Your cart is empty
                </Typography>
            ) : (
                cart.map((item, index) => (
                    <Paper
                        key={item._id ? item._id : `${index}-${item.price}`}
                        elevation={4}
                        sx={{
                            height: '170px',
                            display: 'flex',
                            border: '1px solid #00174F ',
                            width: '700px',
                            marginBottom: '16px',
                            alignItems: 'center',
                            padding: '1px',
                        }}
                    >
                        <Grid container alignItems="center" spacing={0.2}>
                            <Grid item xs={3}>
                                <Box sx={{ maxWidth: '100%' }}>
                                    <img src={`../src/assets/${item.img}`} alt={item.name} style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
                                </Box>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography sx={{ color: '#00174F', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '2px', width: '100px' }}>
                                    {item.name}
                                </Typography>
                            </Grid>

                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', width: "15px" }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid rgb(113, 115, 120)', borderRadius: '15px', width: '80px', justifyContent: 'space-between', padding: '2px' }}>
                                    <IconButton onClick={() => handleReduce(item._id)} sx={{ color: '#00174F', padding: '2px' }}>
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <Typography sx={{ fontWeight: 'bold', color: '#00174F', fontSize: '0.8rem', marginX: '3px' }}>
                                        {item.qty}
                                    </Typography>
                                    <IconButton onClick={() => handleAdd(item)} sx={{ color: '#00174F', padding: '2px' }}>
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Grid>

                            <Grid item xs={2}>
                                <IconButton onClick={() => handleRemove(item._id)} sx={{ color: '#D81633' }}>
                                    <Delete />
                                </IconButton>
                            </Grid>

                            <Grid item xs={2.5} sx={{ textAlign: 'right', position: 'relative', paddingBottom: '10px' }}>
                                <Box sx={{ position: 'absolute', bottom: '-10px', right: 0 }}>
                                    <Typography sx={{ fontWeight: 'bold', color: '#00174F', fontSize: '0.9rem', marginTop: '5px' }}>
                                        {item.qty} x ${item.price.toFixed(2)} {/* כמות x מחיר פר יחידה */}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', color: '#00174F', fontSize: '1.2rem' }}>
                                        ${(item.price * item.qty).toFixed(2)} {/* מחיר כולל כפול כמות */}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            )}
            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" sx={{ textAlign: 'center', color: '#00174F', fontWeight: 'bold' }}>
                Total Price: ${totalPrice.toFixed(2)} {/* סך המחיר הכולל של כל המוצרים בקופה */}
            </Typography>

            <div>
                {cart.length > 0 && (
                    <Button onClick={handleChekUser} sx={{ backgroundColor: '#00174F', color: 'white', padding: '10px 20px', borderRadius: '4px' }}>
                        Finish Order
                    </Button>
                )}

            </div>

            {/* Modal for CChekUser */}
            <Modal
                open={isCChekUserOpen}
                onClose={() => setCChekUserOpen(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ChekUser />
            </Modal>
        </Container>
    );
};

export default Cart;
