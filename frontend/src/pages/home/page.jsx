import styles from './page.module.css'
import Dessert from '../../../public/imgs/homepage/dessert'
import NaturalFood from '../../../public/imgs/homepage/naturalFood'
import Vegetable from '../../../public/imgs/homepage/vegetable'
import { FaMapMarkerAlt, FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa"

export default function Home() {
    return (
        <div className={styles.pageContainer}>
            <section className={styles.topSectionContainer}>
                <h1>Bem-vindo ao My Gastronomy!</h1>
                <br/>
                <p className={styles.topSession}>
                    Olá e bem-vindo ao nosso canto culinário especial, 
                    onde a tradição Italiana dança com criatividade moderna 
                    para lhe proporcionar uma experiência única. 
                    Conosco, cada prato é um abraço de sabor, 
                    concebido com amor e dedicação para fazer 
                    cada um de seus dias inesquecível.
                </p>
            </section>

            <section className={styles.foodSection}>
                <div>
                    <i><NaturalFood /></i>
                    <h3>Excelência na vida cotidiana</h3>
                    <p>
                        Descubra nossa seleção diária de pratos exclusivos para adicionar 
                        um toque fresco e refinado à sua mesa.
                    </p>
                </div>
                <div>
                    <i><Vegetable /></i>
                    <h3>Ingredientes de primeira escolha</h3>
                    <p>Selecionamos cuidadosamente ingredientes excepcionais para garantir a mais alta qualidade em seus pratos favoritos.</p>
                </div>
                <div>
                    <i><Dessert /></i>
                    <h3>Gosto para <br/> todos</h3>
                    <p>Explore um mundo de sabores com a nossa oferta abrangente, concebida para satisfazer o paladar de toda a família, desde aperitivos a sobremesas.</p>
                </div>
            </section>

            <section className={styles.contactSection}>
                <h1>Mantenha-se atualizado!</h1>
                <p>
                    Entre no mundo da My Gastronomy seguindo-nos nas redes sociais. 
                    Você estará sempre atualizado sobre nossas criações culinárias, eventos especiais, 
                    e surpresas gourmet. Não perca uma única mordida!
                </p>
                <div className={styles.socialButtonsContainer}>
                    <a href="https://instagram.com/emersonalves.design" target='_blank'><button className={styles.socialButton}><FaInstagram /></button></a>     
                    <a href="Https://api.whatsapp.com/send?phone=61996606824" target='_blank'><button className={styles.socialButton}><FaWhatsapp /></button></a> 
                    <a href="https://maps.app.goo.gl/9QW7HGc35xMqLEgY9" target='_blank'><button className={styles.socialButton}><FaMapMarkerAlt /></button></a> 
                </div>
            </section>
        </div>
    )
}