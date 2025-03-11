
import React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../api/OrderApi';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../features/OrderSlice';
import Cards from 'react-credit-cards-2';




const schema = Joi.object({
    address: Joi.string().min(5).pattern(/^[a-zA-Zא-ת\s]+$/).required().messages({
        'string.min': 'כתובת חייבת להיות לפחות 5 אותיות',
        'string.pattern.base': 'כתובת יכולה להכיל רק אותיות',
    }),
    cardNumber: Joi.alternatives().try(
        Joi.string().length(15).pattern(/^[0-9]+$/).messages({
            'string.length': 'מספר כרטיס אשראי חייב להיות 15 ספרות',
            'string.pattern.base': 'מספר כרטיס אשראי יכול להכיל רק מספרים',
        }),
        Joi.string().length(16).pattern(/^[0-9]+$/).messages({
            'string.length': 'מספר כרטיס אשראי חייב להיות 16 ספרות',
            'string.pattern.base': 'מספר כרטיס אשראי יכול להכיל רק מספרים',
        })
    ).required().messages({
        'alternatives.match': 'מספר כרטיס אשראי חייב להיות 15 או 16 ספרות',
    }),
    expiryDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/\d{2}$/).required().messages({
        'string.pattern.base': 'תאריך תוקף חייב להיות בפורמט MM/YY',
    }),
    cvv: Joi.string().length(3).pattern(/^[0-9]+$/).required().messages({
        'string.length': 'CVV חייב להיות 3 ספרות',
        'string.pattern.base': 'CVV יכול להכיל רק מספרים',
    }),
});

const OrderForm = ( ) => {
    let currentUser = useSelector(st => st.user.user);
    let products = useSelector(st => st.cart.arr);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema),
    });

    function handleClose(){
    navigate(-1)
    }

    const onSubmit = async (data) => {
        try {
            console.log(data);
            data.products = products;
            data.userId = currentUser._id;

            let res = await addOrder(data, currentUser?.token); // שלח את ההזמנה
            dispatch(resetCart());
            navigate("/"); // סגור את הטופס
        }
        catch (err) {
            console.log(err);

        }

    };

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>סיום הזמנה</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="כתובת"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register('address')}
                        error={!!errors.address}
                        helperText={errors.address ? errors.address.message : ''}
                    />
                    <TextField
                        margin="dense"
                        label="מספר כרטיס אשראי"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register('cardNumber')}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber ? errors.cardNumber.message : ''}
                    />
                    <TextField
                        margin="dense"
                        label="תאריך תוקף (MM/YY)"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register('expiryDate')}
                        error={!!errors.expiryDate}
                        helperText={errors.expiryDate ? errors.expiryDate.message : ''}
                    />
                    <TextField
                        margin="dense"
                        label="CVV"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register('cvv')}
                        error={!!errors.cvv}
                        helperText={errors.cvv ? errors.cvv.message : ''}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            ביטול
                        </Button>
                        <Button type="submit" color="primary">
                            שלח הזמנה
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default OrderForm;
