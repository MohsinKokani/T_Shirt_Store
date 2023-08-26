import express from 'express';
import tshirtController from '../controller/tshirtController.js';
import isAuth from '../middleware/isAuth.js';
import isRole from '../middleware/isRole.js';

const tshirtRoutes = express.Router();

tshirtRoutes.get('/all', tshirtController.getAll);
tshirtRoutes.get('/byId/:id', tshirtController.getById);
tshirtRoutes.get('/search', tshirtController.searchProd);

tshirtRoutes.post('/add', isAuth, isRole("admin"), tshirtController.addNew);

tshirtRoutes.put('/addReview', isAuth, tshirtController.addReview);
tshirtRoutes.put('/updateById/:id', isAuth, isRole("admin"), tshirtController.updateById);

tshirtRoutes.delete('/delReview', isAuth, isRole("admin"), tshirtController.delReview);
tshirtRoutes.delete('/deleteById/:id', isAuth, isRole("admin"), tshirtController.deleteById);

export default tshirtRoutes;