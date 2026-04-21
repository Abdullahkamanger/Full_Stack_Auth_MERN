import express from 'express';
import { getUserProfile, loginUser, logoutUser, registerUser, updateUser } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const Router = express.Router();



Router.post('/register', registerUser);
Router.post('/login', loginUser);
Router.get('/user',isAuthenticated,getUserProfile)
Router.post('/logout',isAuthenticated, logoutUser)
Router.post('/update',isAuthenticated, updateUser)






export default Router;