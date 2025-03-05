
import { useForm } from "react-hook-form";

import axios from "axios";
import { addProduct, update } from "../api/ProductApi";
import { useEffect } from "react";

const FormProduct = ({ item }) => {
    const { register, handleSubmit, reset } = useForm();


    console.log(item);

    const save = async (data) => {
        try {
            if (!item) {
                let res = await addProduct(data)
                alert("נוסף בהצלחה");
            } else {
                let res = await update(item._id, data)
                alert("עודכן בהצלחה");
            }


            reset()
        } catch (err) {
            alert("תקלה בהוספת מוצר\n" + err.message);
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
            ingredient: item ? item.ingredient : ""
        });
    }, [])

    return (
        <form className="add-form" onSubmit={handleSubmit(save)  }>
            <label>שם מוצר</label>
            <input type="text" {...register("name")} required />

            <label>תיאור מוצר</label>
            <input type="text" {...register("description")} required />

            <label>מחיר של המוצר</label>
            <input type="number" {...register("price")} required />

            <label>תאריך</label>
            <input type="date" {...register("date")} required />

            <label>כתובת תמונה</label>
            <input type="text" {...register("img")} />

            <label>קטגוריה</label>
            <input type="text" {...register("category")} />

            <label>מרכיבים</label>
            <input type="text" {...register("ingredient")} placeholder="פרט מרכיבים, מופרדים בפסיקים" />

            <input type="submit" value="הוסף מוצר" />
        </form>
    );
};

export default FormProduct;

