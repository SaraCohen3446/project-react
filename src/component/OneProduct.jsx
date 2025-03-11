import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/OrderSlice";
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { deleteById } from "../api/ProductApi";
import MinCart from "./MinCart";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
        dispatch(addItem({ _id: item._id, name: item.name, price: item.price, img: item.img, quantity: 1, }));
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
            width: 300,
            height: 'auto',
            margin: '20px',
            // border: '3px solid #00174F',
            // borderRadius: '20px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 0
        }}>
            <Card sx={{
                // borderRadius: '20px',
                width: '100%', position: 'relative', paddingTop: '20px'
                // border: '3px solid #00174F'
            }}>
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        image={`../src/assets/${item.img}`}
                        alt={item.name}
                        sx={{ height: 220, objectFit: 'cover', cursor: 'pointer' }}
                        onClick={goToDetails}
                    />
                    <Box sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        {currentUser?.role === "MANAGER" && (
                            <IconButton
                                onClick={(e) => { e.preventDefault(); removeProduct(e); }}
                                sx={{ bgcolor: 'transparent', outline: "none", "&:focus, &:active": { outline: "none", boxShadow: "none" } }}>
                                <DeleteIcon sx={{ color: "#00174F" }} />
                            </IconButton>
                        )}
                        <Link to="/FormProduct" state={item} onClick={(e) => e.stopPropagation()}>
                            <IconButton
                                sx={{ bgcolor: 'transparent', outline: "none", "&:focus, &:active": { outline: "none", boxShadow: "none" } }}>
                                <EditIcon sx={{ color: "#00174F" }} />
                            </IconButton>
                        </Link>
                        <IconButton
                            onClick={handleAddToCart}
                            sx={{ bgcolor: 'transparent', outline: "none", "&:focus, &:active": { outline: "none", boxShadow: "none" } }}>
                            <ShoppingCartIcon sx={{ color: "#00174F" }} />
                        </IconButton>
                        <IconButton
                            onClick={toggleFavorite}
                            sx={{ bgcolor: 'transparent', outline: "none", "&:focus, &:active": { outline: "none", boxShadow: "none" } }}>
                            {isFavorited ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon sx={{ color: "red" }} />}
                        </IconButton>
                    </Box>
                </Box>
            </Card >
            <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#00174F' }}>
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: ${item.price.toFixed(2)}
                </Typography>
            </CardContent>
            {cartPopupOpen && <MinCart setCartPopupOpen={setCartPopupOpen} cartPopupOpen={cartPopupOpen} />}
        </Box >
    );
};

export default OneProduct;
