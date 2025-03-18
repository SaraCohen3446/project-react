import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/OrderSlice";
import { Box, Typography, Button, IconButton, FormControl, InputLabel, Select, MenuItem, Modal } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { getById } from "../api/ProductApi";
import MinCart from "./MinCart";
import forShowDetiles from '../assets/forShowDetiles.png';



const ShowDetails = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [item, setItem] = useState({});
    const [cartPopupOpen, setCartPopupOpen] = useState(false);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [modalOpen, setModalOpen] = useState(true); // For modal state
    const dispatch = useDispatch();

    async function fetchProductById(id) {
        try {
            let res = await getById(id);
            setItem(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProductById(id);
    }, [id]);

    const handleAddToCart = (event) => {
        event.preventDefault();
        dispatch(addItem({ _id: item._id, name: item.name, price: item.price, img: item.img, quantity }));
        setCartPopupOpen(true);
        setTimeout(() => {
            setCartPopupOpen(false);
        }, 1800);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        navigate("/");
    };

    return (
        <Modal open={modalOpen} onClose={handleCloseModal}>
                    {/* <img src={forShowDetiles} alt="Cart Logo" style={{ width: '100%' }} /> */}
            
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 4,
                backgroundColor: 'white',
                width: '80%',
                maxWidth: '1000px',
                minHeight: '600px',
                boxShadow: 3,
                borderRadius: '8px',
                border: '1px solid #ddd',
                position: 'relative',
                boxSizing: 'border-box',
                margin: 'auto'
            }}>

                {/* Product Image */}
                <Box sx={{ width: '40%', marginRight: 4 }}>
                    <img
                        src={`../src/assets/${item.img}`}
                        alt={item.name}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                </Box>

                {/* Product Details */}
                <Box sx={{ width: '60%' }}>
                    <Typography variant="h6" color="text.secondary" sx={{ marginBottom: 1 }}>
                        {item.category} {/* Category */}
                    </Typography>
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        {item.name} {/* Product Name */}
                    </Typography>
                    <Typography variant="h6" color="text.primary" sx={{ marginBottom: 2 }}>
                        ${item.price} {/* Price */}
                    </Typography>

                    {/* Color Options */}
                    <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                        <Typography variant="body1" sx={{ alignSelf: 'center' }}>Choose Color: </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {['#000000', '#0033FF', '#D81633', '#FFFFFF'].map((colorValue, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setColor(colorValue)}
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: '50%',
                                        backgroundColor: colorValue,
                                        border: color === colorValue ? '3px solid #00174F' : 'none',
                                        cursor: 'pointer'
                                    }} />
                            ))}
                        </Box>
                    </Box>

                    {/* Size Selection */}
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Size</InputLabel>
                        <Select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            label="Size"
                        >
                            <MenuItem value="S">Small</MenuItem>
                            <MenuItem value="M">Medium</MenuItem>
                            <MenuItem value="L">Large</MenuItem>
                            <MenuItem value="XL">Extra Large</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Quantity Selector */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <Typography variant="body1" sx={{ marginRight: 2 }}>Quantity:</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                        >-</Button>
                        <Typography variant="body1" sx={{ margin: '0 10px' }}>{quantity}</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => setQuantity(quantity + 1)}
                        >+</Button>
                    </Box>

                    {/* Add to Cart Button */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            onClick={handleAddToCart}
                            sx={{
                                bgcolor: '#00174F',
                                color: 'white',
                                padding: 1,
                                borderRadius: '50%',
                                '&:hover': { bgcolor: '#D81633' }
                            }}
                        >
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} />
                        </IconButton>

                        {/* Like Button */}
                        <IconButton
                            sx={{
                                marginLeft: 2,
                                color: 'gray',
                                '&:hover': { color: 'red' }
                            }}
                        >
                            ❤️
                        </IconButton>
                    </Box>
                </Box>

                {/* Cart Popup */}
                {cartPopupOpen && <MinCart setCartPopupOpen={setCartPopupOpen} cartPopupOpen={cartPopupOpen} />}
            </Box>
        </Modal>
    );
};

export default ShowDetails;
