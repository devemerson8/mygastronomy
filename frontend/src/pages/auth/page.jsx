import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import styles from './page.module.css';
import authServices from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";

export default function Auth() {
    const [formType, setFormType] = useState('login');
    const [formData, setFormData] = useState({});
    const { login, signup, authLoading } = authServices();
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        if (authData) {
            return navigate('/profile');
        }
    }, [authData, navigate]);

    const handleChangeFormType = () => {
        setFormData({});
        if (formType === 'login') {
            setFormType('signup');
        } else {
            setFormType('login');
        }
    };

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        switch (formType) {
            case 'login':
                login(formData);
                break;
            case 'signup':
                if (formData.password !== formData.confirmPassword) {
                    console.log('As senhas não conferem!');
                    return;
                }
                signup(formData);
                break;
            default:
                break;
        }
    };

    if (authLoading) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div className={styles.authPageContainer}>
            {formType === 'login' ? (
                <>
                    <h1>Login</h1>
                    <button onClick={handleChangeFormType}>Você não tem cadastro? Clique aqui</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField 
                            required
                            label="Email"
                            type="email"
                            name="email"
                            onChange={handleFormDataChange}
                        />
                        <TextField 
                            required
                            label="Senha"
                            type="password"
                            name="password"
                            onChange={handleFormDataChange}
                        />
                        <button type="submit">Login<LuLogIn /></button>
                    </form>
                </>
            ) : null}

            {formType === 'signup' ? (
                <>
                    <h1>Cadastro</h1>
                    <button onClick={handleChangeFormType}>Você já tem conta cadastrada? Clique aqui</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField 
                            required
                            label="Nome Completo"
                            type="fullname"
                            name="fullname"
                            onChange={handleFormDataChange}
                        />
                        <TextField 
                            required
                            label="Email"
                            type="email"
                            name="email"
                            onChange={handleFormDataChange}
                        />
                        <TextField 
                            required
                            label="Senha"
                            type="password"
                            name="password"
                            onChange={handleFormDataChange}
                        />
                        <TextField 
                            required
                            label="Confirme a senha"
                            type="password"
                            name="confirmPassword"
                            onChange={handleFormDataChange}
                        />
                        <button type="submit">Cadastre<LuLogIn /></button>
                    </form>
                </>
            ) : null}
        </div>
    );
}
