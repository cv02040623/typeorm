import { Router } from "express";
import { RoleController } from "../controller/RoleController";
import { transformRouter } from '../utils/index';
const app = Router();

//路由二级分发
export const Routes = [{
    method: "get",
    route: "/role",
    controller: RoleController,
    action: "all"
}, {
    method: "put",
    route: "/role",
    controller: RoleController,
    action: "update"
}, {
    method: "post",
    route: "/role",
    controller: RoleController,
    action: "save"
}, {
    method: "delete",
    route: "/role/:id",
    controller: RoleController,
    action: "remove"
}];

const router = transformRouter(app, Routes)


export default router;