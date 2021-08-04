import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Account } from "../entity/Account";
import { validate } from 'class-validator';
import { _fobj } from "../utils";
import { Encrypt, Decrypt } from "../utils/md5";
const random = require('string-random');

export class AccountController {

    private userRepository = getRepository(Account);

    async all(request: Request, response: Response, next: NextFunction) {
        let { skip, take } = request.query;
        let pam = this.userRepository.create(request.query);
        let sql = _fobj(pam as Object)
        return getRepository(Account)
            .createQueryBuilder('account')
            .where(sql)
            .skip(((skip - 1) * 1 || 0) * (take * 1 || 10))
            .take(take * 1 || 10)
            .getManyAndCount()
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let account = this.userRepository.create(request.body)
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
                .set(account as {})
                .where('id=:id', { ...account })
                .execute()
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let ranstr = random(6, { letters: 'qwertyuiopasdfghjklzxcvbnm' });
        let account = this.userRepository.create(request.body);
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
                .values({ ...request.body, password: Encrypt(ranstr) })
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