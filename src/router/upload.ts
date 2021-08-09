import { Router } from "express";
import { imgController } from "../controller/imgControlle";
import { transformRouter } from '../utils/index';
const app = Router();

//路由二级分发
export const Routes = [{
    method: "post",
    route: "/upload",
    controller: imgController,
    action: "upload"
}];

const router = transformRouter(app, Routes)


export default router;