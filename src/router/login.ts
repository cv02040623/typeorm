import { Router } from "express";
import { LoginController } from "../controller/loginController";
import { transformRouter } from '../utils/index';
const app = Router();

export const Routes = [{
    method: "post",
    route: "/login",
    controller: LoginController,
    action: "login"
}];

const router = transformRouter(app, Routes)


export default router;