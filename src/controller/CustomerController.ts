import { getRepository, createQueryBuilder } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Customers } from "../entity/Customers";
import { validate } from 'class-validator';
import { _fobj } from "../utils";
import { Encrypt, Decrypt } from "../utils/md5";
import { Account } from "../entity/Account";
const random = require('string-random');

export class CustomerController {

    private repository = getRepository(Customers);

    async all(request: Request, response: Response, next: NextFunction) {
        let { skip, take } = request.query;
        let pam = this.repository.create(request.query);
        let sql = _fobj(pam as Object)
        return this.repository
            .createQueryBuilder()
            .where(sql)
            .skip(((skip - 1) * 1 || 0) * (take * 1 || 10))
            .take(take * 1 || 10)
            .getManyAndCount()
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let customer = this.repository.create(request.body)
        const errors = await validate(customer);
        if (errors && errors.length > 0) {
            return {
                msg: Object.values(errors[0].constraints).join() || '失败',
                code: -1
            }
        } else {
            return this.repository
                .createQueryBuilder()
                .update(Customers)
                .set(customer as {})
                .where('id=:id', { ...customer })
                .execute()
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let ranstr = random(6, { letters: 'qwertyuiopasdfghjklzxcvbnm' });
        let customer = this.repository.create(request.body);
        let sql = _fobj(customer);
        const errors = await validate(customer);
        if (errors && errors.length > 0) {
            return {
                msg: Object.values(errors[0].constraints).join() || '失败',
                code: -1
            }
        } else {
            return this.repository
                .createQueryBuilder()
                .insert()
                .into(Customers)
                .values({ ...sql, password: Encrypt(ranstr) })
                .execute()
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        return this.repository
            .createQueryBuilder()
            .delete()
            .from(Customers)
            .where("id = :id", { ...request.params })
            .execute()
    }

}