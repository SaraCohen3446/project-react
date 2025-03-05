import { useForm } from "react-hook-form";
import axios from "axios";
import { addProduct, update } from "../api/ProductApi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FormProduct = () => {
    const location = useLocation();
    const item = location.state;
    const { register, handleSubmit, reset } = useForm();
    const [imagePreview, setImagePreview] = useState(item ? item.img : "");

    // פונקציה לשמירת המוצר
    const save = async (data) => {
        try {
            // אם יש תמונה ב-Preview, נעדכן אותה ב-data
            if (imagePreview) {
                data.img = imagePreview;
            }

            let res;
            if (!item) {
                res = await addProduct(data);
                alert("נוסף בהצלחה");
            } else {
                res = await update(item._id, data);
                alert("עודכן בהצלחה");
            }

            reset();
        } catch (err) {
            alert("תקלה בהוספת מוצר\n" + err.message);
        }
    };

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
            date: item ? item.date : "",
            img: item ? item.img : "",
            category: item ? item.category : "",
            ingredient: item ? item.ingredient : "",
        });
    }, [item, reset]);

    return (
        <form className="add-form" onSubmit={handleSubmit(save)}>
            <label>שם מוצר</label>
            <input type="text" {...register("name")} required />

            <label>תיאור מוצר</label>
            <input type="text" {...register("description")} required />

            <label>מחיר של המוצר</label>
            <input type="number" {...register("price")} required />

            <label>תאריך</label>
            <input type="date" {...register("date")} required />

            <label>כתובת תמונה</label>
            <input type="string" {...register("img")} />

            <label>קטגוריה</label>
            <input type="text" {...register("category")} />

            <label>מרכיבים</label>
            <input type="text" {...register("ingredient")} placeholder="פרט מרכיבים, מופרדים בפסיקים" />

            <input type="submit" value="הוסף מוצר" />
        </form>
    );
};

export default FormProduct;
