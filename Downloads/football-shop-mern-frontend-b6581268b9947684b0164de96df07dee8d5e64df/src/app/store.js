import { configureStore } from '@reduxjs/toolkit';
import profile from '../pages/ProfileSlice';
import product from '../pages/ProductSlice';
import cart from '../pages/CartSlice';
import notification from '../pages/NotificationSlice';



export default configureStore({
    reducer: {
      product,
      profile,
      cart, 
      notification
    },
  });
