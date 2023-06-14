import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import DetailProduct from "./components/DetailProduct";
import EditProduct from "./components/EditProduct";
import Navigation from "./components/Navigation";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route exact path="tambah" element={<AddProduct />} />
            <Route
              exact
              path="detail-product/:id"
              element={<DetailProduct />}
            />
            <Route exact path="edit-product/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;



// const express = require('express');
// const path = require('path');
// const app = express();
// // const productRouter = require('./app/product/routes');
// // const productRouterV2 = require('./app/product_v2/routes');
// const logger = require('morgan');

// app.use(logger('dev'));
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.use('/public', express.static(path.join(__dirname, 'uploads')));
// // app.use('/api/v1', productRouter);
// // app.use('/api/v2', productRouterV2);
// app.use((req, res, next) =>{
//     res.status(404);
//     res.send({
//         status: 'Failed',
//         message: 'Resource' + req.originalUrl + ' Not Found'
//     })
// })
// app.listen(3000, () => console.log('Server: http://localhost:3000'));