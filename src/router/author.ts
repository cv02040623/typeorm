import { Router } from "express";
import { AuthorController } from "../controller/AuthorController";
import { transformRouter } from '../utils/index';
const app = Router();

//路由二级分发
export const Routes = [{
    method: "get",
    route: "/author",
    controller: AuthorController,
    action: "all"
}, {
    method: "put",
    route: "/author",
    controller: AuthorController,
    action: "update"
}, {
    method: "post",
    route: "/author",
    controller: AuthorController,
    action: "save"
}, {
    method: "delete",
    route: "/author/:id",
    controller: AuthorController,
    action: "remove"
}];

const router = transformRouter(app, Routes)


export default router;