import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Role } from "../entity/Role";
import { validate } from 'class-validator';
import { _fobj } from "../utils";
import { decode } from "../utils/jwt";
import { Account } from "../entity/Account";

export class RoleController {

    private Repository = getRepository(Role);

    async all(request: Request, response: Response, next: NextFunction) {
        let { skip, take } = request.params;
        let pam = this.Repository.create(request.query);
        let sql = _fobj(pam as Object);
        return getRepository(Role)
            .createQueryBuilder('role')
            .leftJoinAndSelect(Account,'account','account.id=role.create_main')
            .where(sql)
            .skip(((skip - 1) * 1 || 0) * (take * 1 || 10))
            .take(take * 1 || 10)
            .getManyAndCount()
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let role = this.Repository.create(request.body)
        const errors = await validate(role);
        if (errors && errors.length > 0) {
            return {
                msg: Object.values(errors[0].constraints).join() || '失败',
                code: -1
            }
        } else {
            return this.Repository
                .createQueryBuilder()
                .update(Role)
                .set(role as {})
                .where('id=:id', { ...role })
                .execute()
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        //获取创建人信息
        let createMain = decode(request)
        let role = this.Repository.create(request.body);
        let sql = _fobj(role);
        const errors = await validate(role);
        if (errors && errors.length > 0) {
            return {
                msg: Object.values(errors[0].constraints).join() || '失败',
                code: -1
            }
        } else {
            return this.Repository
                .createQueryBuilder()
                .insert()
                .into(Role)
                .values({ ...sql, create_main: createMain['id'] })
                .execute()
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        // let r = await this.Repository.find({ pid: request.params.id });
        // if (r && r.length != 0) {
        //     return {
        //         code: -1,
        //         msg: '当前权限存在子集'
        //     }
        // } else {
        //     return this.Repository
        //         .createQueryBuilder()
        //         .delete()
        //         .from(Role)
        //         .where("id = :id", { ...request.params })
        //         .execute()
        // }
    }

}