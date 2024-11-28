import platesServices from "../../services/plates"
import { useEffect, useState } from "react"
import Loading from "../loading/page"
import PlateCard from "../../components/plateCard/plateCard"
import styles from './page.module.css'
import PlatePopup from "../../components/platePopup/platePopup"
import { useCartContext } from "../../contexts/useCartContext"

export default function Plates() {

    const { getAvailablePlates, platesList, platesLoading, refetchPlates } = platesServices()
    const [plateSelected, setPlateSelected] = useState(null)
    const { addToCart } = useCartContext()

    useEffect(() => {
        if(refetchPlates) {
            getAvailablePlates()
        }
    }, [refetchPlates])

    const handlePlateSelected = (plate) => {
        setPlateSelected(plate)
    }

    const handleClosePopup = () => {
        setPlateSelected(null)
    }

    const handleAddToCart = (itemToAdd) => {
        addToCart(itemToAdd)
        handleClosePopup()
    }

    if(platesLoading) {
        return( <Loading /> )
    }

    return (
        <>
            <div className={styles.pageContainer}>
                <section className={styles.topSectionContainer}>
                    <h3>Que tal experimentar algo novo e delicioso?</h3>
                    <br/>
                    <p className={styles.topSession}>
                        Não importa sua escolha, cada prato é preparado com amor e dedicação para tornar sua refeição inesquecível. Clique e escolhe o parto desejado! 
                    </p>
                </section>
            </div>
            <div className={styles.plateItemsContainer}>
                {platesList.map((plate) => (
                    <div key={plate._id} className={styles.cardContainer} onClick={() => { handlePlateSelected(plate) }}>
                        <PlateCard plateData={plate} />
                    </div>
                ))}
            </div>

            {plateSelected && (
                <PlatePopup 
                plateData={plateSelected} 
                onClose={handleClosePopup} 
                onAddToCart={handleAddToCart}
                />
            )}
        </>
    )
}