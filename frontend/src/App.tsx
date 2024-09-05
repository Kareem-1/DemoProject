import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<ProductList />} />
          <Route path='add-product' element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
