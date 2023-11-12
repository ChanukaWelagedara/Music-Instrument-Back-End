import express from "express";
import * as userController from '../controller/userController.js';
import verifyToken from "../middleWare/verifyToken.js";

const router = express.Router();

// User Signup
router.post('/signup', userController.signUp);

// User Login
router.post('/login', userController.login);

// Get User by ID
router.get('/:id', userController.getUserById);

// Edit User by ID
router.put('/:id', userController.editUser);

// Delete User by ID
router.delete('/:id', userController.deleteUser);


router.post('/logout',userController.logout);

router.get('/getUserItems',userController.getUserItems);
// Define the route for getting user-specific items
router.get('/api/user/items',verifyToken, userController.getUserItems);

export default router;
