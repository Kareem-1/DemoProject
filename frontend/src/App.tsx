/*import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import AddProduct from "./pages/AddProduct/AddProduct";*/
import Footer from "./components/Footer/Footer";
import useInitData from "./hooks/useInitData";
import { useEffect } from "react";

export default function App() {
  const initData = useInitData();
  
  useEffect(() => {
    initData();
  }, [])
  
  return (
    <>
      <main>
        
      </main>
      <Footer />
    </>
  )
}
