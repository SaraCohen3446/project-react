import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/OrderSlice";
import { Card, CardContent, CardMedia, Typography, Button, Modal, Drawer } from '@mui/material';
import { deleteById } from "../api/ProductApi";
import MinCart from "./MinCart";
import FormProduct from "../pages/FormProduct";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";

const OneProduct = ({ item, showAddToCart = true, onDelete }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.user); //שךיפת משתמש נוכחי מהרידקס
    const [cartPopupOpen, setCartPopupOpen] = useState(false); // מצב לחלון הקטן

    const handleAddToCart = (event) => {
        event.preventDefault();
        dispatch(addItem({ _id: item._id, name: item.name, price: item.price, quantity: 1 }));

        // הצגת המודל הקטן עם רשימת המוצרים
        setCartPopupOpen(true);
        setTimeout(() => {
            setCartPopupOpen(false);
        }, 1800);

    };



    const removeProduct = async () => {
        try {
            let res = await deleteById(item._id)
            console.log(res.data);
            onDelete(item._id)
        }
        catch (err) {
            console.log(err)
            alert("error in delete product");

        }
    }


    return (
        <div>
            <Card className="product-container" >
                <CardMedia component="img" image={`../src/assets/${item.img}`} alt={item.name} className="product-image" />
                <CardContent>
                    <Typography variant="h5">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        price: ${item.price}
                    </Typography>
                    {showAddToCart && (<IconButton onClick={handleAddToCart}> add to cart  <ShoppingCartIcon /> </IconButton>)}
                    {currentUser?.role == "MANAGER" && (<IconButton onClick={(e) => { e.preventDefault(); removeProduct }}><DeleteIcon /></IconButton>)}
                    {currentUser?.role == "MANAGER" && (<Link to="/FormProduct" state={item}><IconButton> <EditIcon /> </IconButton></Link>)}

                </CardContent>
            </Card>
            {cartPopupOpen && <MinCart setCartPopupOpen={setCartPopupOpen} cartPopupOpen={cartPopupOpen} />}
          

        </div>
    );
};

export default OneProduct;