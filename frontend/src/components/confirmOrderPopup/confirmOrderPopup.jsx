import { Dialog } from "@mui/material";
import styles from './confirmOrderPopup.module.css';
import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ConfirmOrderPopup({ open, onClose, onConfirm }) {
    const [formData, setFormData] = useState(null);
    const authData = JSON.parse(localStorage.getItem('auth'));
    const navigate = useNavigate();

    const handleConfirm = (e) => {
        e.preventDefault();

        if (!authData?.user?._id) {
            return navigate('/auth');
        } else {
            if (!formData?.pickupTime) {
                return;
            } else {
                const orderData = {
                    userId: authData?.user?._id,
                    pickupTime: formData?.pickupTime
                };

                onConfirm(orderData);
                
                // Redireciona para a página /profile após a confirmação do pedido
                navigate('/profile');
            }
        }
    };

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <div className={styles.popupContainer}>
                <h1>Estamos quase lá...</h1>
                <p>
                    Confirme seu pedido com a data: <strong>{(new Date()).toLocaleDateString()}</strong>.
                </p>
                <p>A que horas você virá buscar seu pedido?</p>
                
                <form className={styles.formContainer}>
                    <TextField
                        onChange={handleFormDataChange}
                        required
                        type="time"
                        name='pickupTime'
                    />
                    <div className={styles.confirmBtns}>
                        <button onClick={handleConfirm}>Confirmar</button>
                        <button className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}