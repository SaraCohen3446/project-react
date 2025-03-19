import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/OrderSlice";
import { Box, Typography, Button, IconButton, FormControl, TextField, Select, MenuItem, Modal } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { getById } from "../api/ProductApi";
import MinCart from "./MinCart";

const ShowDetails = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [item, setItem] = useState({});
    const [cartPopupOpen, setCartPopupOpen] = useState(false);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [modalOpen, setModalOpen] = useState(true);
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
        dispatch(addItem({ _id: item._id, name: item.name, price: item.price, img: item.img, quantity:quantity }));
        setCartPopupOpen(true);
        setTimeout(() => {
            setCartPopupOpen(false);
        }, 1800);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        navigate(-1);
    };

    return (
        <Modal open={modalOpen} onClose={handleCloseModal}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 4,
                backgroundColor: 'white',
                width: '60%',
                maxWidth: '1000px',
                minHeight: '600px',
                boxShadow: 3,
                borderRadius: '8px',
                border: '5px solid #00174F',
                position: 'relative',
                boxSizing: 'border-box',
                margin: 'auto',
                marginTop: '80px',
                zIndex: 1300
            }}>

                <Box sx={{
                    position: 'absolute',
                    top: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '700px',
                    height: '100px',
                    backgroundImage: 'url(../src/assets/forShowDetiles.png)', // Use your image path here
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                }}></Box>

                {/* Product Image */}
                <Box sx={{ width: '40%', marginLeft: 3, marginTop: 15}}>
                    <img
                        src={`../src/assets/${item.img}`}
                        alt={item.name}
                        style={{ width: '400px', height: "400px", objectFit: 'cover' }}
                    />
                </Box>

                {/* Product Details */}
                <Box sx={{ width: '60%', marginTop: 18, paddingLeft: 15 }}>
                    <Typography variant="h6" color="text.secondary" sx={{ marginBottom: 1 }}>
                        {item.category}
                    </Typography>
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        {item.name}
                    </Typography>
                    <Typography variant="h6" color="#00174F" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                        ${item.price}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        {item.description} {/* Description */}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        Ingredients: {item.ingredient?.join(', ')} {/* Ingredients */}
                    </Typography>

                    {/* Color Options */}
                    <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {['#000000', '#00174F', '#D81633', '#FFFFFF'].map((colorValue, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setColor(colorValue)}
                                    sx={{
                                        width: 20, // הקטנתי את הגודל
                                        height: 20, // הקטנתי את הגובה
                                        borderRadius: '50%',
                                        backgroundColor: colorValue,
                                        border: `2px solid black`, // מסגרת שחורה קבועה
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'transform 0.2s ease-in-out', // אנימציה חלקה
                                        transform: color === colorValue ? 'scale(1.2)' : 'scale(1)' // זום לצבע הנבחר
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>


                    {/* קונטיינר מסודר יותר */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2, marginTop: 4 }}>
                        {/* בחירת מידה - רחב יותר וקטן יותר */}
                        <FormControl sx={{ width: '145px', height: '42px' }}> {/* שווה בגודל לשדה הכמות */}
                            <Select
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                displayEmpty
                                sx={{
                                    bgcolor: '#00174F',
                                    color: 'white',
                                    fontSize: '14px',
                                    height: '42px', // מתאים לשדה הכמות
                                    '& .MuiSelect-icon': { color: 'white' }
                                }}
                            >
                                <MenuItem value="" disabled>Select Size</MenuItem>
                                {['S', 'M', 'L', 'XL'].map((s) => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* שדה כמות - צר יותר ויישור אמצעי */}
                        <TextField
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            inputProps={{ min: 1 }}
                            sx={{
                                width: '48px', // קטן יותר
                                height: '39px', // מתאים לגובה של ה-Select
                                bgcolor: '#F8F9FA',

                                borderRadius: '4px',
                                '& input': { textAlign: 'center', fontSize: '14px', padding: '10px', }
                            }}
                        />



                    </Box>

                    <Button
                        onClick={(event) => {
                            event.stopPropagation();
                            handleAddToCart(event);
                        }}
                        sx={{
                            bgcolor: 'white',
                            color: '#00174F',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            textTransform: 'none',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            position: 'absolute',
                            right: 63, // מזיז יותר ימינה
                            bottom: "65px" // מוריד את הכפתור למטה
                        }}
                    >
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
                    </Button>
                </Box>

                {/* Cart Popup Above Modal */}
                {cartPopupOpen && <MinCart setCartPopupOpen={setCartPopupOpen} cartPopupOpen={cartPopupOpen} />}
            </Box>
        </Modal >
    );
};

export default ShowDetails;
