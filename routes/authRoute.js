import express from 'express';
import { 
    registerController,
    loginController,
    testController, 
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController} from '../controller/authController.js';
import {isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router();

//Routing
//Register || METHOD POST
router.post('/register',registerController);

//Login || METHOD POST 
router.post('/login', loginController);

//Forgot Password || METHOD POST
router.post('/forgot-password',forgotPasswordController );

//Test Route
router.get('/test', requireSignIn, isAdmin, testController);

//Protected User Route | Auth
router.get('/user-auth', requireSignIn, (req,res) => {
    res.status(200).send({ ok: true });
});

//Protected Admin Route | Auth
router.get('/admin-auth', requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);


export default router;

