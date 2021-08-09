import { Router } from "express";
import { CustomerController } from "../controller/CustomerController";
import { transformRouter } from '../utils/index';
const app = Router();

//路由二级分发
export const Routes = [{
    method: "get",
    route: "/customer",
    controller: CustomerController,
    action: "all"
}, {
    method: "put",
    route: "/customer",
    controller: CustomerController,
    action: "update"
}, {
    method: "post",
    route: "/customer",
    controller: CustomerController,
    action: "save"
}, {
    method: "delete",
    route: "/customer/:id",
    controller: CustomerController,
    action: "remove"
}];

const router = transformRouter(app, Routes)


export default router;