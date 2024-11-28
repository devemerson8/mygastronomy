import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth";
import orderServices from "../../services/order";
import styles from './page.module.css';
import { LuLogOut, LuTimer, LuAlertCircle, LuCheckCircle } from "react-icons/lu";
import { Link } from "react-router-dom";
import Loading from "../loading/page";

export default function Profile() {
    const { logout } = authServices();
    const { getUserOrders, orderLoading, refetchOrders, ordersList } = orderServices();
    const navigate = useNavigate();
    const authData = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        if (!authData) {
            return navigate('/auth');
        } else if (refetchOrders) {
            getUserOrders(authData?.user?._id);
        }
    }, [authData, refetchOrders, getUserOrders, navigate]);

    if (orderLoading) {
        return <Loading />;
    }

    const handleLogout = () => {
        logout();
        return navigate('/');
    };

    console.log(ordersList);

    return (
        <div className={styles.pageContainer}>
            <div>
                <h1>{authData?.user?.fullname}</h1>
                <h3>{authData?.user?.email}</h3>
            </div>

            <button onClick={handleLogout}>Sair<LuLogOut /></button>

            {ordersList.length > 0 ? (
                <div className={styles.ordersContainer}>
                    {ordersList.map((order) => (
                        <div key={order._id} className={styles.orderContainer}>
                            {order.pickupStatus === 'Pendente' && <p className={`${styles.pickupStatus} ${styles.pending}`}><LuTimer />{order.pickupStatus}</p>}
                            {order.pickupStatus === 'Concluído' && <p className={`${styles.pickupStatus} ${styles.completed}`}><LuCheckCircle />{order.pickupStatus}</p>}
                            {order.pickupStatus === 'Cancelado' && <p className={`${styles.pickupStatus} ${styles.canceled}`}><LuAlertCircle />{order.pickupStatus}</p>}
                            <h3>{order.pickupTime}</h3>
                            {order.orderItems.map((item) => (
                                <div key={item._id}>
                                    <h4>{item.itemDetails?.[0]?.name}</h4>
                                    <p>Quantidade: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    Você ainda não tem ordens.
                    <Link to={'/plates'} className={styles.platesLink}>Clique aqui e veja as nossas especialidades!</Link>
                </div>
            )}
        </div>
    );
}
