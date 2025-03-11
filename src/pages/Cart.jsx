import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, reduce, addItem } from '../features/OrderSlice.js';
import { Container, Typography, IconButton, Box, Paper, Divider, Grid } from '@mui/material';
import { Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import ChekForOrder from './ChekForOrder.jsx';
import OrderForm from './OrderFrom.jsx';


const Cart = () => {
    const cart = useSelector((state) => state.cart.arr || []);
    const totalPrice = useSelector((state) => state.cart.sum);
    const currentUser = useSelector((st) => st.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isCheckForOrderOpen, setCheckForOrderOpen] = useState(false); // מצב לפתיחת CheckForOrder


    const handleRemove = (id) => {
        dispatch(removeItem({ _id: id }));
    };

    const handleReduce = (id) => {
        dispatch(reduce({ _id: id }));
    };

    const handleAdd = (item) => {
        dispatch(addItem(item));
    };

    // פונקציה שמבצעת את הפעולה כשאין currentUser
    const handleCheckForOrder = () => {
        if (!currentUser) {
            setCheckForOrderOpen(true);
        } else {
            navigate("/orderForm")
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
                                    <Typography sx={{ fontWeight: 'bold', color: '#00174F', fontSize: '1.2rem' }}>
                                        ${item.price.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            )}
            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" sx={{ textAlign: 'center', color: '#00174F', fontWeight: 'bold' }}>
                Total Price: ${totalPrice.toFixed(2)}
            </Typography>

            <div>
                <button onClick={handleCheckForOrder}>סיים הזמנה</button> {/* כפתור עם התנאי */}
                {isCheckForOrderOpen && <ChekForOrder />}
            </div>
        </Container>
    );
};

export default Cart;
