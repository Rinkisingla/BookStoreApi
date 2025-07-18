 import  Router from "express"
 import { userregister, userSignin } from "../controllers/usercontrollers.js"
 const router = Router()

 router.route('/register').post(userregister);
  router.route('/Signin').post(userSignin);
 export default router;
