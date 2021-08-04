import { Router } from "express";
import { AccountController } from "../controller/AccountController";
import { transformRouter } from '../utils/index';
const app = Router();

//路由二级分发
export const Routes = [{
    method: "get",
    route: "/users",
    controller: AccountController,
    action: "all"
}, {
    method: "put",
    route: "/users",
    controller: AccountController,
    action: "update"
}, {
    method: "post",
    route: "/users",
    controller: AccountController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: AccountController,
    action: "remove"
}];

const router = transformRouter(app, Routes)


export default router;