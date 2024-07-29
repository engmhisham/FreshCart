import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import TokenContextProvider from './Context/TokenContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext';
import WishlistContextProvider from './Context/WishlistContext';
import OrderContextProvider from './Context/OrderContext';





const root = ReactDOM.createRoot(document.getElementById('root'));

let query = new QueryClient();

root.render(

  <TokenContextProvider>
    <CartContextProvider>
      <WishlistContextProvider>
        <OrderContextProvider>
          <QueryClientProvider client={query}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </QueryClientProvider>
        </OrderContextProvider>
      </WishlistContextProvider>
    </CartContextProvider>
  </TokenContextProvider>

);