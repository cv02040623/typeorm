import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Account } from "../entity/Account";
import { validate } from 'class-validator';
import { _fobj } from "../utils";

export class AccountController {

    private userRepository = getRepository(Account);

    async all(request: Request, response: Response, next: NextFunction) {
        let { skip, take } = request.query;
        let sql = _fobj(request.query as Object, ['username', 'status', 'create_time'])
        return getRepository(Account)
            .createQueryBuilder('account')
            .where({ ...sql })
            .skip((skip * 1 || 0) * (take * 1 || 10))
            .take(take * 1 || 10)
            .getManyAndCount()
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let account = new Account();
        for (const key in request.body) {
            account[key] = request.body[key]
        }
        const errors = await validate(account);
        if (errors && errors.length > 0) {
            return {
                msg: Object.values(errors[0].constraints).join() || '失败',
                code: -1
            }
        } else {
            return this.userRepository
                .createQueryBuilder()
                .update(Account)
                .set(request.body)
                .where('id=:id', { ...request.body })
                .execute()
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let account = new Account();
        for (const key in request.body) {
            account[key] = request.body[key]
        }
        const errors = await validate(account);
        if (errors && errors.length > 0) {
            return {
                msg: Object.values(errors[0].constraints).join() || '失败',
                code: -1
            }
        } else {
            return this.userRepository
                .createQueryBuilder()
                .insert()
                .into(Account)
                .values(request.body)
                .execute()
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        return this.userRepository
            .createQueryBuilder()
            .delete()
            .from(Account)
            .where("id = :id", { ...request.params })
            .execute()
    }

}