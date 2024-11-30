import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './navbar.module.css'
import { LuShoppingCart, LuUserCircle, LuMenu, LuLogOut } from "react-icons/lu"
import { Drawer } from '@mui/material'
import authServices from "../../services/auth"
import orderServices from "../../services/order"
import Loading from "../../pages//loading/page"

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    const { logout } = authServices();
    const navigate = useNavigate();
    const { getUserOrders, orderLoading, refetchOrders, ordersList } = orderServices();
    const authData = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        if (!authData) {
            navigate('/auth');
        } else if (refetchOrders) {
            getUserOrders(authData?.user?._id);
        }
    }, [authData, refetchOrders, navigate]);

    if (orderLoading) {
        return <Loading />;
    }

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    console.log(ordersList);
    console.log(authData); //  esta linha para verificar os dados de autenticação

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItems}>
                <Link to={'/'}>
                    <img className={styles.logo} src="/imgs/logo.png" alt="Logo" />
                </Link>
                <div className={styles.navbarLinksContainer}>
                    <Link to={'/'} className={styles.navbarLink}>Home</Link>
                    <Link to={'/plates'} className={styles.navbarLink}>Pratos</Link>
                    <Link to={'/cart'} className={styles.navbarLink}>
                        <LuShoppingCart />
                    </Link>
           
                    <Link to={'/profile'} className={styles.navbarLink}>
                        <LuUserCircle /> 
                    </Link>
                 
                    {authData?.user && (
                        <div className={styles.navbarLinksContainer}>
                            <p className={styles.userName}> Olá, {authData.user.fullname}</p>
                            <p className={styles.loggout}  onClick={handleLogoutClick} ><LuLogOut /></p>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.mobileNavbarItems}>
                <Link to={'/'}>
                    <img className={styles.logo} src="/imgs/logo.png" alt="Logo" />
                </Link>
                <div className={styles.mobileNavbarBtns}>
                    <Link to={'/cart'} className={styles.navbarLink}>
                        <LuShoppingCart />
                    </Link>
                    <LuMenu className={styles.navbarLink} onClick={handleOpenMenu} />
                </div>
            </div>
            <Drawer
                anchor='right'
                open={openMenu}
                onClose={handleOpenMenu}
            >
                <div className={styles.drawer}>
                    {authData?.user && (
                        <div className={styles.drawerUserMenu}>
                        
                            <p className={styles.userName} onClick={handleLogoutClick}>Olá, {authData.user.fullname} <LuLogOut /></p>
                        </div>
                    )}
                    <Link to={'/'} className={styles.navbarLink} onClick={handleOpenMenu}>Home</Link>
                    <Link to={'/plates'} className={styles.navbarLink} onClick={handleOpenMenu}>Pratos</Link>
                    <Link to={'/profile'} className={styles.navbarLink} onClick={handleOpenMenu}>Perfil</Link>
                    
                </div>
            </Drawer>
        </nav>
    );
}
