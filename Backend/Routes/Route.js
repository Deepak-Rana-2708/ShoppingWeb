import express from 'express';
import JwtToken from '../Middleware/JwtToken.js'
import { CreateUser, forgotPassword, Login, Logout,ResetPassword,verifyOtp } from '../Controllers/UserController.js'
import { OrderData, UpdateOrderStatus, DirectBuy, submitContact, DeleteOrder, pendingOrders } from '../Controllers/OrderController.js';
import { payment } from '../Controllers/Payment.js';

const router = express.Router();

// User Data route 

router.post("/login", Login);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/otp", verifyOtp);
router.post("/reset-password", ResetPassword);
router.get("/logout", Logout);
router.post("/create", CreateUser);

// User Order route
 
router.post("/order/:id", JwtToken, OrderData); // order krne k liye ( t-shirt ) etc. and we got order-user-id (userid) and orderid
router.get("/pending/data/:userid", JwtToken, pendingOrders); // we got all data all data jo pending hoga...
// router.post("/order/update/:userid/:orderid", JwtToken, UpdateOrderStatus); // ye update krne k liye pending ko success k liye
router.post("/order/update/data", JwtToken, UpdateOrderStatus);
router.post("/direct_buy/:id", JwtToken,DirectBuy)//Direct Buy
router.post("/order/delete/data", JwtToken, DeleteOrder); // ye pending data ko delete krne k liye...


router.post("/create-checkout-session", JwtToken, payment);


router.post("/contact/data",JwtToken,submitContact)

export default router;