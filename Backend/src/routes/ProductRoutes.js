import express from 'express';
import { getProducts ,getProductById, updateProductById, deleteProductById, createProduct } from '../controllers/ProductController.js';
import  isAuthenticated  from '../middlewares/isAuthenticated.js';

const Router = express.Router();


Router.get('/',isAuthenticated, getProducts);
Router.post('/',isAuthenticated, createProduct);
Router.get('/:id',isAuthenticated, getProductById);
Router.put('/:id',isAuthenticated, updateProductById);
Router.delete('/:id',isAuthenticated, deleteProductById);





export default Router