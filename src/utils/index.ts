import { Request, Response } from "express";
const logger = require('./logger');
//路由类型转化
interface RouterType {
    method: string,
    route: string,
    controller: Function,
    action: string
}
const transformRouter = (app, routers: RouterType[]) => {
    routers.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result
                    .then(r => {
                        r && !r.code ? res.json({
                            msg: '成功',
                            code: 200,
                            data: r && { list: r[0], count: r[1] } || null
                        }) : res.json(r || {})
                    })
                    .catch(err => {
                        logger.error(err)
                        next(err)
                    });

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    return app
}


//获取时间年月日
const getCurrentTime = () => {
    var date = new Date();
    var month = date.getMonth() + 1 + '';
    var currentTime = date.getFullYear() + '-' +
        month.padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0');
    return currentTime
}


//省略对象中不需要的字段
const _fobj = (r: Object, a: string[]) => {
    let element = {}
    for (const key in r) {
        if (a.includes(key) && r[key] != '' && r[key] != null && r[key] != undefined) {
            element[key] = r[key];
        }
    }
    return element
}



export {
    transformRouter,
    getCurrentTime,
    _fobj
}
