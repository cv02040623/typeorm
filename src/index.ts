import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import Routes from './routes';
import { jwtAuth } from './utils/jwt';
const fs = require('fs');
const logger=require('morgan');
const path = require('path');


createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // 输出日志到目录
    var logDirectory = __dirname + '/log';
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/request.log'), { flags: 'a', encoding: 'utf8' });
    app.use(logger('combined', { stream: accessLogStream }));

    // token 设置
    app.use(jwtAuth);
    // register express routes from defined application routes
    Routes.forEach(r => app.use(r.url, r.router))

    
    // 处理没有捕获的异常，导致 node
    app.use(function (req, res, next) {

    });

    //异常捕获
    app.use((err, req: Request, res: Response, next: Function) => {
        if (err && err.name === 'UnauthorizedError') {
            const { status = 401, message } = err;
            res.status(status).json({
                code: status,
                msg: 'token失效，请重新登录',
                data: null
            })
        } else if (err && err.name == 'BusinessError') {
            res.json({ ...err })
        } else {
            const { output = {} } = err || {};
            const errCode = (output && output.statusCode) || 500;
            const errMsg = (output && output.payload && output.payload.error) || err.message;
            res.status(errCode).json({
                code: errCode,
                msg: errMsg
            })
        }
    })
    // start express server
    app.listen(3000, err => {
        if (!err) console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
    });





}).catch(error => console.log(error));
