import styles from './plateCard.module.css'

export default function PlateCard({ plateData }) {
    return(
        
        <>
            <div className={styles.cardContainer}>
                <img src={plateData.imgUrl} alt="" />
                <div className={styles.cardContent}>
                    <h5>{plateData.name}</h5>
                    <h5 className={styles.price}>R$ {plateData.price}</h5>
                </div>
            </div>
        </>
    )
}