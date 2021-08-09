import { getRepository, createQueryBuilder } from "typeorm";
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
        let [data, count] = await createQueryBuilder(Role, "role")
            .leftJoinAndMapOne('role.createByMan', Account, "account", "account.id=role.createById")
            .where(sql)
            .skip(((skip - 1) * 1 || 0) * (take * 1 || 10))
            .take(take * 1 || 10)
            .getManyAndCount();
        data = data.map(i => {
            i['createByMan'] = {
                name: i['createByMan']['username'],
                id: i['createByMan']['id']
            }
            return i
        })
        return [data, count]
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
        let createMan = decode(request)
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
                .values({ ...sql, createById: createMan['id'] })
                .execute()
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        //判断当前角色是否被绑定
        let r = await createQueryBuilder(Account, 'account').where('account.rid=:id', { ...request.params }).getOne();
        if (r) {
            return {
                code: -1,
                msg: '当前角色已经被绑定'
            }
        } else {
            return this.Repository
                .createQueryBuilder()
                .delete()
                .from(Role)
                .where("id = :id", { ...request.params })
                .execute()
        }
    }

}