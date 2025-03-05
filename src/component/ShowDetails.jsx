import { Button, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getById } from "../api/ProductApi";


export const ShowDetalis = () => {

    let { id } = useParams();
    let navigate = useNavigate()
    const [item, setItem] = useState({});

    const [modalOpen, setModalOpen] = useState(true);

    async function fetchProductById(id) {
        try {
            let res = await getById(id)
            setItem(res.data)
            console.log(res.data);

        }
        catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        fetchProductById(id)
    }, [id])


    const handleClose = () => {
        setModalOpen(false);  // close the modal when the close button is clicked
        navigate(-1)
    };

    return <>
        {/* מודל להצגת פרטי המוצר */}
        <Modal open={modalOpen} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <div style={{ width: '100%', backgroundColor: 'white' }}>
                <Button onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <CloseIcon />
                </Button>
                <h2 id="modal-title">{item?.name}</h2>
                <img src={`../src/assets/${item?.img}`} alt={item?.name} />
                <p id="modal-description">{item?.description}</p>
                <Typography variant="body1">{item?.ingredient}</Typography>
                <Typography variant="body1">{item?.category}</Typography>
                <Typography variant="body1">{item?.date}</Typography>
                <Typography variant="body2">{item?.additionalDetails}</Typography>
                <Button onClick={handleClose}>close</Button>
            </div>
        </Modal>
    </>
}