import { useForm } from "react-hook-form";
import { addProduct, update } from "../api/ProductApi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Snackbar, Alert, Grid } from "@mui/material";
import { useSelector } from "react-redux";

const FormProduct = () => {
    const location = useLocation();
    const item = location.state;
    const { register, handleSubmit, reset, setValue } = useForm();
    const [imagePreview, setImagePreview] = useState(item ? item.img : "");
    const currentUser = useSelector(state => state.user.user);
    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const save = async (data) => {
        try {
            if (!data.img || imagePreview !== item?.img) {
                data.img = imagePreview;
            }

            if (!item) {
                await addProduct(data, currentUser?.token);
                setSnackbar({ open: true, message: "Product added successfully!", severity: "success" });
            } else {
                await update(item._id, data, currentUser?.token);
                setSnackbar({ open: true, message: "Product edited successfully!", severity: "success" });
            }

            reset();
            setImagePreview("");
        } catch (err) {
            setSnackbar({ open: true, message: "Problem with product: " + err.message, severity: "error" });
            console.log(err);
        }
    };

    useEffect(() => {
        if (item) {
            setImagePreview(item.img);
        }
    }, [item]);

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

    const handleImageChange = (e) => {
        setImagePreview(e.target.value);
        setValue("img", e.target.value); // Update the form value
    };

    return (
        <Container sx={{
            width: "50%", // או כל אחוז שמתאים לך
            paddingBottom: 3,
            marginTop: 15,
            paddingTop: 2,
            backgroundColor: "#F7F2F3",
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border: "2px solid #00174F"
        }}>
            <Typography variant="h4" sx={{ color: "#00174F", marginBottom: 4, textAlign: "center" }}>
                {item ? "Edit product" : "Add product"}
            </Typography>

            <form onSubmit={handleSubmit(save)} style={{ width: "100%" }}>
                <TextField label="Product name" variant="outlined" fullWidth sx={{ marginBottom: 2 }} {...register("name")} required />
                <TextField label="Description" variant="outlined" fullWidth sx={{ marginBottom: 2 }} {...register("description")} required />
                <TextField label="Product price" variant="outlined" fullWidth type="number" sx={{ marginBottom: 2 }} {...register("price")} required />
                <TextField label="Date" variant="outlined" fullWidth type="date" sx={{ marginBottom: 2 }} {...register("date")} required InputLabelProps={{ shrink: true }} />
                <TextField
                    label="img src"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    {...register("img")}
                    value={imagePreview}
                    onChange={handleImageChange}
                />
                <TextField label="Category" variant="outlined" fullWidth sx={{ marginBottom: 2 }} {...register("category")} />
                <TextField label="Ingredient" variant="outlined" fullWidth sx={{ marginBottom: 2 }} {...register("ingredient")} placeholder="פרט מרכיבים, מופרדים בפסיקים" />

                <Grid container spacing={2} sx={{ marginTop: 0 }}>
                    <Grid item xs={6}>
                        <Button onClick={() => navigate(-1)} variant="contained" fullWidth sx={{ color: "#fff", backgroundColor: "#D81633" }}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" fullWidth sx={{ color: "#fff", backgroundColor: "#00174F" }}>
                            {item ? "Edit product" : "Add product"}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {/* Snackbar Alert */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default FormProduct;
