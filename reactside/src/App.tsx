import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddProduct from './comonents/AddProduct';
import ProductList from './comonents/ProductList';
import './sass.scss'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<ProductList/>}/>
          <Route path='add-product' element={<AddProduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
