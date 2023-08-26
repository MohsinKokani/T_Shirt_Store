import express from "express";
import cartController from "../controller/cartController.js";
import isAuth from '../middleware/isAuth.js';

const cartRoute = express.Router();

cartRoute.delete('/delAll', cartController.deleteAll);
cartRoute.post('/add', isAuth, cartController.addItem);
cartRoute.delete('/remove/:product', isAuth, cartController.removeItem);
// cartRoute.put('/update/:itemId', cartController.updateItemQuantity);
cartRoute.get('/all', isAuth, cartController.getCartItems);
// cartRoute.get('/total', cartController.getCartTotal);

export default cartRoute;