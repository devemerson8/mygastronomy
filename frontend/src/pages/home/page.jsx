import styles from './page.module.css'
import Dessert from '../../../public/imgs/homepage/dessert'
import NaturalFood from '../../../public/imgs/homepage/naturalFood'
import Vegetable from '../../../public/imgs/homepage/vegetable'
import { FaMapMarkerAlt, FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa"

export default function Home() {
    return (
        <div className={styles.pageContainer}>
            <section>
                <h1>Bem Vindo ao My Gastronomy.</h1>
                <p>
                    Olá e bem-vindo ao nosso canto culinário especial, 
                    onde a tradição italiana dança com criatividade moderna 
                    para lhe proporcionar uma experiência culinária única. 
                    Conosco, cada prato é um abraço de sabor, 
                    concebido com amor e dedicação para fazer 
                    cada um de seus dias inesquecível.
                </p>
            </section>

            <section className={styles.foodSection}>
                <div>
                    <i><NaturalFood /></i>
                    <h4>Excelência na vida cotidiana</h4>
                    <p>
                        Descubra nossa seleção diária de pratos exclusivos para adicionar 
                        um toque fresco e refinado à sua mesa.
                    </p>
                </div>
                <div>
                    <i><Vegetable /></i>
                    <h4>Ingredientes de primeira escolha</h4>
                    <p>Selecionamos cuidadosamente ingredientes excepcionais para garantir a mais alta qualidade em seus pratos favoritos.</p>
                </div>
                <div>
                    <i><Dessert /></i>
                    <h4>Gosto para todos</h4>
                    <p>Explore um mundo de sabores com a nossa oferta abrangente, concebida para satisfazer o paladar de toda a família, desde aperitivos a sobremesas.</p>
                </div>
            </section>

            <section className={styles.contactSection}>
                <h1>Mantenha-se atualizado!</h1>
                <p>
                    Entre no mundo da Minha Gastronomia seguindo-nos nas redes sociais. 
                    Você estará sempre atualizado sobre nossas criações culinárias, eventos especiais, 
                    e surpresas gourmet. Não perca uma única mordida!
                </p>
                
                <div className={styles.socialButtonsContainer}>
                    <button className={styles.socialButton}><FaInstagram /> Instagram</button>
                    <button className={styles.socialButton}><FaFacebookSquare /> Facebook</button>
                    <button className={styles.socialButton}><FaWhatsapp /> Whatsapp</button>
                    <button className={styles.socialButton}><FaMapMarkerAlt />Location</button>
                </div>
 
            </section>
        </div>
    )
}