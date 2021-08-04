import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Account } from "../entity/Account";
import { _fobj } from "../utils";
import { setCode } from '../utils/jwt';
const logger = require('../utils/logger');

export class LoginController {
    async login(request: Request, response: Response, next: NextFunction) {
        let { account, password } = request.body
        if (!account || !password) {
            return {
                code: -1,
                msh: '请输入账号或者密码'
            }
        }
        let r = await getRepository(Account).createQueryBuilder('account')
            .where(request.body)
            .getOne();
        var ret = {}
        if (r) {
            if (r.status != 1) {
                ret = {
                    code: -1,
                    msg: '账号状态异常'
                }
            }
            ret = {
                code: 200,
                msg: '登录成功',
                token:setCode(r),
                data: r
            }
        } else {
            ret = {
                code: -1,
                msg: '账号密码错误'
            }
        }
        return ret
    }
}