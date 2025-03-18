import { useForm } from "react-hook-form";
import axios from "axios";
import { addProduct, update } from "../api/ProductApi";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useSelector } from "react-redux";

const FormProduct = () => {
    const location = useLocation();
    const item = location.state;
    const { register, handleSubmit, reset } = useForm();
    const [imagePreview, setImagePreview] = useState(item ? item.img : "");
    const currentUser = useSelector(state => state.user.user);
    const navigate = useNavigate();




    const save = async (data) => {
        try {
            // אם יש תמונה ב-Preview, עדכן אותה בנתונים לפני שליחה
            if (imagePreview !== item?.img) {
                // עדכון התמונה אם התמונה החדשה שונה מהתמונה הישנה
                data.img = imagePreview;
            }

            let res;
            if (!item) {
                res = await addProduct(data, currentUser?.token);
                alert("Add successful");
            } else {
                res = await update(item._id, data, currentUser?.token);
                alert("Edit successful");
            }

            reset(); // איפוס הטופס אחרי שליחה
        } catch (err) {
            alert("Problem with product\n" + err.message);
            console.log(err);
        }
    };
    
    useEffect(() => {
        if (item) {
            // אם יש תמונה במוצר, הצג אותה ב-preview
            setImagePreview(item.img);
        }
    }, [item]);


    // פונקציה לטיפול בהעלאת תמונה
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                // שלח את התמונה לשרת
                const res = await axios.post("/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                // עדכון ה-URL של התמונה ב-state
                setImagePreview(res.data.imageUrl); // נניח שהשרת מחזיר את ה-URL של התמונה
            } catch (err) {
                console.error("Error uploading image:", err);
            }
        }
    };

    useEffect(() => {
        reset({
            name: item ? item.name : "",
            description: item ? item.description : "",
            price: item ? item.price : "",
            date: item ? new Date(item.date).toISOString().split("T")[0] : "",
            img: item ? item.img : "",
            category: item ? item.category : "",
            ingredient: item ? item.ingredient : "",
        });
    }, [item, reset]);


    return (
        <Container sx={{ maxWidth: "sm", paddingTop: 4, backgroundColor: "#F7F2F3", borderRadius: 2, display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", border: "2px solid #00174F" }}>
            {/* כותרת בראש העמוד */}
            <Typography variant="h4" sx={{ color: "#00174F", marginBottom: 4, textAlign: "center" }}>

                {item ? "Edit product" : "Add product"}

            </Typography>

            <form onSubmit={handleSubmit(save)} style={{ width: "100%" }}>
                <TextField
                    label="Product name"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    {...register("name")}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    {...register("description")}
                    required
                />
                <TextField
                    label="Product price"
                    variant="outlined"
                    fullWidth
                    type="number"
                    sx={{ marginBottom: 2 }}
                    {...register("price")}
                    required
                />
                <TextField
                    label="Date"
                    variant="outlined"
                    fullWidth
                    type="date"
                    sx={{ marginBottom: 2 }}
                    {...register("date")}
                    required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="img src"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    {...register("img")}
                />
                <TextField
                    label="Category"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    {...register("category")}
                />
                <TextField
                    label="Ingredient"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    {...register("ingredient")}
                    placeholder="פרט מרכיבים, מופרדים בפסיקים"
                />
                <Button
                    type="submit"
                    variant="outlined"
                    fullWidth
                    sx={{
                        color: "#fff",
                        backgroundColor: "#00174F",
                        borderColor: "#00174F",
                        '&:hover': { backgroundColor: "#D81633", borderColor: "#D81633" },
                    }} >

                    {item ? "Edit product" : "Add product"}
                </Button>

                <Button
                    onClick={() => navigate(-1)}
                    variant="outlined"
                    fullWidth
                    sx={{
                        color: "#fff",
                        backgroundColor: "#D81633",
                        borderColor: "#D81633",
                        mt: 2, // מרווח מעל הכפתור
                        '&:hover': { backgroundColor: "#00174F", borderColor: "#00174F" },
                    }} >
                    Cancel
                </Button>
            </form>
        </Container>
    );
};

export default FormProduct;
