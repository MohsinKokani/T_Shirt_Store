import express from 'express';
import orderController from '../controller/orderController.js';
import tshirtController from '../controller/tshirtController.js';
import isAuth from '../middleware/isAuth.js';
import isRole from '../middleware/isRole.js';

const orderRoute = express.Router();


orderRoute.get('/myOrders', isAuth, orderController.myOrders);
orderRoute.get('/allOrders', isAuth, isRole('admin'), orderController.getAllOrders)
orderRoute.get('/getById/:id', isAuth, orderController.getOrderById);

orderRoute.post('/newOrder', isAuth, orderController.newOrder);

orderRoute.delete('/delete/:id', isAuth, isRole('admin'), orderController.delOrder)

orderRoute.put('/updateOrderStatus', isAuth, isRole('admin'), orderController.updateOrderStatus);

export default orderRoute;