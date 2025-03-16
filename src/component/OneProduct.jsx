import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/OrderSlice";
import { Box, Typography, IconButton } from '@mui/material';
import { deleteById } from "../api/ProductApi";
import MinCart from "./MinCart";
import { Link, useNavigate } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; // אייקון מודרני יותר
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const OneProduct = ({ item, showAddToCart = true, onDelete }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.user);
    const [cartPopupOpen, setCartPopupOpen] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = (event) => {
        event.preventDefault();
        dispatch(addItem({ _id: item._id, name: item.name, price: item.price, img: item.img, quantity: 1 }));
        setCartPopupOpen(true);
        setTimeout(() => {
            setCartPopupOpen(false);
        }, 1800);
    };

    const toggleFavorite = (event) => {
        event.preventDefault();
        setIsFavorited(!isFavorited);
    };

    const removeProduct = async (event) => {
        event.stopPropagation();
        try {
            let res = await deleteById(item._id, currentUser?.token);
            console.log(res.data);
            onDelete(item._id);
        } catch (err) {
            console.log(err);
            alert("error in delete product");
        }
    };

    const goToDetails = () => {
        navigate(`/details/${item._id}`);
    };

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer',
            paddingBottom: 2,
            borderBottom: '1px solid #ddd',
            marginBottom: 2
        }} onClick={goToDetails}>

            {/* Product Image */}
            <Box sx={{ position: 'relative', width: 300 }}>
                <Box component="img"
                    src={`../src/assets/${item.img}`}
                    alt={item.name}
                    sx={{ width: '100%', height: "300px", objectFit: 'cover' }} // תמונה יותר ארוכה
                />

                {/* Edit and Delete Icons (Above Favorite Icon) */}
                {currentUser?.role === "MANAGER" && (
                    <Box sx={{
                        position: 'absolute', top: 180, left: 10, display: 'flex', flexDirection: 'column', gap: 0
                    }}>
                        <IconButton
                            onClick={(e) => { e.preventDefault(); removeProduct(e); }}
                            sx={{
                                bgcolor: 'transparent',
                                outline: "none",
                                "&:focus, &:active": { outline: "none", boxShadow: "none" }
                            }}
                        >
                            <DeleteIcon sx={{ color: "#808080" }} />
                        </IconButton>
                        <Link to="/FormProduct" state={item} onClick={(e) => e.stopPropagation()}>
                            <IconButton
                                sx={{
                                    bgcolor: 'transparent',
                                    outline: "none",
                                    "&:focus, &:active": { outline: "none", boxShadow: "none" }
                                }}
                            >
                                <EditIcon sx={{ color: "#808080" }} />
                            </IconButton>
                        </Link>
                    </Box>
                )}

                {/* Favorite Icon */}
                <IconButton
                    onClick={(event) => {
                        event.stopPropagation();
                        toggleFavorite(event);
                    }}
                    sx={{
                        position: 'absolute', bottom: 10, left: 10,
                        bgcolor: 'transparent', outline: "none", "&:focus, &:active": { outline: "none", boxShadow: "none" }
                    }}>
                    {isFavorited ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon sx={{ color: "red" }} />}
                </IconButton>
            </Box>

            {/* Product Info */}
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#00174F', marginTop: 1, textAlign: 'left', width: '100%' }}>
                {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', width: '100%' }}>
                ${item.price}
            </Typography>

            {/* Add to Cart Button (Stylish Icon) */}
            <IconButton
                onClick={(event) => {
                    event.stopPropagation();
                    handleAddToCart(event);
                }}
                sx={{
                    bgcolor: 'transparent',
                    color: '#808080',
                    position: 'absolute',
                    bottom: 10, right: 10,
                    outline: "none",
                    transition: 'background 0.2s',
                    "&:hover": { bgcolor: "#f0f0f0" }, // אפקט רקע עדין בלחיצה
                    "&:focus, &:active": { outline: "none", boxShadow: "none" }
                }}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} />
            </IconButton>

            {cartPopupOpen && <MinCart setCartPopupOpen={setCartPopupOpen} cartPopupOpen={cartPopupOpen} />}
        </Box>
    );
};

export default OneProduct;
