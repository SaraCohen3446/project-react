import { Drawer, Typography, Divider, List, ListItem, ListItemText, ListItemSecondaryAction, Box } from '@mui/material';
import { useSelector } from "react-redux";
import forMinCart from '../assets/forMinCart.jpeg';

const MinCart = ({ setCartPopupOpen, cartPopupOpen }) => {
    const cart = useSelector(state => state.cart.arr); // Display the cart

    return (
        <Drawer
            anchor="right"
            open={cartPopupOpen}
            onClose={() => setCartPopupOpen(false)}
            aria-labelledby="cart-popup-title"
            aria-describedby="cart-popup-description"
            sx={{
                width: 400,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 400,
                    padding: '20px',
                    backgroundColor: '#f0f4f8',
                    borderRadius: '8px 0 0 8px',
                    boxShadow: '0px 2px 30px rgba(0, 0, 0, 0.2)',
                },
            }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <img src={forMinCart} alt="Cart Logo" style={{ width: '400px', height: '150px', marginRight: '10px' }} />

            </Box>

            <Divider sx={{ margin: '10px 0' }} />
            <List>
                {cart.map((cartItem) => {
                    const imageUrl = cartItem.img; // ודא שהמשתנה מוגדר כאן

                    return (
                        <ListItem key={cartItem._id} sx={{ padding: '15px 0', display: 'flex', alignItems: 'center' }}>
                            <ListItemText
                                primary={cartItem.name}
                                secondary={
                                    <>
                                        <Typography variant="body2" color="textSecondary">
                                            Quantity: {cartItem.qty}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Price: ${cartItem.price.toFixed(2)}
                                        </Typography>
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <img
                                    src={imageUrl} // השתמש במשתנה כאן
                                    alt={cartItem.name}
                                    style={{ maxWidth: '60px', borderRadius: '4px', marginLeft: '10px' }}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>

            <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Total: ${cart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2)}
            </Typography>
        </Drawer>
    );
}

export default MinCart;