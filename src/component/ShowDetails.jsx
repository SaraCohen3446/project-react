import { Button, Modal, Typography, Box, CardMedia } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getById } from "../api/ProductApi";
import forShowDetiles from '../assets/forShowDetiles.png';

export const ShowDetails = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [item, setItem] = useState({});
    const [modalOpen, setModalOpen] = useState(true);

    async function fetchProductById(id) {
        try {
            let res = await getById(id);
            setItem(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProductById(id);
    }, [id]);

    const handleClose = () => {
        setModalOpen(false);
        navigate(-1);
    };

    return (
        <Modal open={modalOpen} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: '20px',
                outline: 'none',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: 3,
                borderRadius: '8px',
                width: '600px',
                minHeight: '500px', // מוסיף גובה כדי שהמסגרת תיראה גם למעלה ולמטה
                border: '10px solid #00174F', // מסגרת מכל הכיוונים
                boxSizing: 'border-box', // מוודא שהמסגרת נספרת כחלק מהגודל
                position: 'relative'
            }}>
                {/* לוגו על כל הרוחב */}
                <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
                    <img src={forShowDetiles} alt="Cart Logo" style={{ width: '100%' }} />
                </Box>

                {/* כפתור סגירה בצבע #00174F */}
                <Button onClick={handleClose} sx={{ position: 'absolute', top: '10px', right: '10px', color: '#00174F' }}>
                    <CloseIcon />
                </Button>

                {/* תמונת המוצר */}
                <CardMedia
                    component="img"
                    height="300"
                    image={`../src/assets/${item.img}`}
                    alt={item.name}
                    sx={{ width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />

                {/* פרטי המוצר */}
                <Box sx={{ width: '100%', mt: 2, textAlign: 'center' }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        {item.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        {item.description}
                    </Typography>
                    <Typography variant="h6"> ${item.price}</Typography>
                    <Typography variant="h7">{item.category}</Typography>
                    <Typography variant="h8">{item.date}</Typography>
                    <Typography variant="h6" color="text.secondary">{item.additionalDetails}</Typography>
                </Box>

                <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2, backgroundColor: '#00174F' }}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default ShowDetails;
