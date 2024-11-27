import Navbar from "./components/navbar/navbar"
import Footer from "./components/footer/footer"
import { Outlet } from "react-router-dom"
import { CartProvider } from "./contexts/useCartContext"

export default function App() {

  return (
    <>
      <CartProvider>
        <Navbar />
          <main>
            <Outlet />
          </main>
        <Footer />
      </CartProvider>
    </>
  )
}