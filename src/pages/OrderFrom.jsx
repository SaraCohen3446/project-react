import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stepper, Step, StepLabel, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../api/OrderApi';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../features/OrderSlice';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


//תקינות לשדות עם joi
const schema = Joi.object({
    name: Joi.string().min(2).required().messages({
        'string.min': 'שם חייב להיות לפחות 2 תווים',
        'string.empty': 'השם נדרש',
    }),
    address: Joi.string().min(5).required().messages({
        'string.min': 'כתובת חייבת להיות לפחות 5 תווים',
        'string.empty': 'הכתובת נדרשת',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'כתובת אימייל לא תקינה',
        'string.empty': 'אימייל נדרש',
    }),
    cardNumber: Joi.string().length(16).pattern(/^[0-9]+$/).required().messages({
        'string.length': 'מספר כרטיס חייב להיות באורך 16 תווים',
        'string.pattern.base': 'מספר הכרטיס יכול להכיל רק מספרים',
    }),
    expiryDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/\d{2}$/).required().messages({
        'string.pattern.base': 'תוקף הכרטיס חייב להיות בפורמט MM/YY',
    }),
    cvv: Joi.string().length(3).pattern(/^[0-9]+$/).required().messages({
        'string.length': 'ה-CVV חייב להיות באורך 3 תווים',
        'string.pattern.base': 'ה-CVV יכול להכיל רק מספרים',
    }),
    notes: Joi.string().allow('').optional(),
});

const steps = ["Personal Details", "Payment Details", "Order Completion"];

const OrderForm = () => {
    const currentUser = useSelector(st => st.user.user);
    const products = useSelector(st => st.cart.arr);
    const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        resolver: joiResolver(schema),
    });
    const [focus, setFocus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        if (currentUser) {
            setValue('name', currentUser.userName || '');
            setValue('email', currentUser.email || '');
        }
    }, [currentUser, setValue]);

    function handleClose() {
        navigate(-1);
    }

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);


    const onSubmit = async (data) => {
        try {
            data.products = products.map(item => ({
                product: item,
                count: item.quantity,
            }));

            // הוספת ה-userId 
            data.userId = currentUser._id;

            // עדכון תאריך הגעת ההזמנה
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 7); // מוסיף 7 ימים מהתאריך הנוכחי
            const deliveryDateString = deliveryDate.toLocaleDateString('he-IL'); // ממיר את התאריך לפורמט תאריך עברי

            data.dateEnd = deliveryDate; // עדכון התאריך בנתונים

            // שליחה לשרת
            await addOrder(data, currentUser?.token);

            // ריסט לארגז הקניות אחרי השליחה
            dispatch(resetCart());

            // הצגת הודעה על הצלחה
            setSnackbarMessage(`Your order has been successfully placed! It will arrive on: ${deliveryDateString} at: ${data.address}`);
            setOpenSnackbar(true);

            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            console.log(err);
            setSnackbarMessage("An error occurred while submitting the order. Please try again.");
            setOpenSnackbar(true);
        }
    };


    // בדיקה אם יש איזה שדה ריק /לא תקין ועדכון ע"כ בצעד האחרון
    useEffect(() => {
        if (activeStep === 2) {
            const isError = Object.keys(errors).length > 0;
            if (isError) {
                setErrorMessage('Some required fields are missing or incorrect');
            } else {
                setErrorMessage('');
            }
        }
    }, [errors, activeStep]);

    return (
        <Dialog open={true} onClose={handleClose} fullWidth>
            <DialogTitle>Complete Your Order</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ "& .MuiStepIcon-root": { color: "#00174F" }, }}>

                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 && (
                    <>
                        <TextField {...register('name')} label="Full Name" fullWidth margin="dense" error={!!errors.name} helperText={errors.name?.message} />
                        <TextField {...register('address')} label="Address" fullWidth margin="dense" error={!!errors.address} helperText={errors.address?.message} />
                        <TextField {...register('email')} label="Email" fullWidth margin="dense" error={!!errors.email} helperText={errors.email?.message} />
                    </>
                )}
                {activeStep === 1 && (
                    <>
                        <Cards number={watch('cardNumber', '')} name={watch('name', '')} expiry={watch('expiryDate', '').replace('/', '')} cvc={watch('cvv', '')} focused={focus} />
                        <TextField {...register('cardNumber')} label="Card Number" fullWidth margin="dense" error={!!errors.cardNumber} helperText={errors.cardNumber?.message} onFocus={() => setFocus('number')} />
                        <TextField {...register('expiryDate')} label="Expiry Date (MM/YY)" fullWidth margin="dense" error={!!errors.expiryDate} helperText={errors.expiryDate?.message} onFocus={() => setFocus('expiry')} />
                        <TextField {...register('cvv')} label="CVV" fullWidth margin="dense" error={!!errors.cvv} helperText={errors.cvv?.message} onFocus={() => setFocus('cvc')} />
                        <h3 style={{ color: "#00174F" }}>Total Payment: ${totalPrice.toFixed(2)}</h3>
                    </>
                )}
                {activeStep === 2 && (
                    <>
                        <TextField {...register('notes')} label="Notes for Delivery" fullWidth margin="dense" />
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    </>
                )}

                <DialogActions>
                    {activeStep > 0 && (
                        <Button onClick={handleBack} sx={{ color: "#D81633" }} >
                            Back
                        </Button>
                    )}
                    {activeStep < steps.length - 1 ? (
                        <Button onClick={handleNext} sx={{ color: "#00174F", }}  >
                            Next
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit(onSubmit)} sx={{ color: "#00174F", }} >
                            Place Order
                        </Button>
                    )}
                </DialogActions>
            </DialogContent>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>{snackbarMessage}</Alert>
            </Snackbar>
        </Dialog >
    );
};

export default OrderForm;