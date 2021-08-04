import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Author } from "../entity/Author";
import { validate } from 'class-validator';
import { _fobj } from "../utils";

export class AuthorController {

    private Repository = getRepository(Author);

    async all(request: Request, response: Response, next: NextFunction) {
        let pam = this.Repository.create(request.query);
        let sql = _fobj(pam as Object)
        return getRepository(Author)
            .createQueryBuilder('author')
            .where(sql)
            .getManyAndCount()
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let author = this.Repository.create(request.body)
        const errors = await validate(author);
        if (errors && errors.length > 0) {
            return {
                msg: Object.values(errors[0].constraints).join() || '失败',
                code: -1
            }
        } else {
            return this.Repository
                .createQueryBuilder()
                .update(Author)
                .set(author as {})
                .where('id=:id', { ...author })
                .execute()
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let author = this.Repository.create(request.body);
        const errors = await validate(author);
        if (errors && errors.length > 0) {
            return {
                msg: Object.values(errors[0].constraints).join() || '失败',
                code: -1
            }
        } else {
            return this.Repository
                .createQueryBuilder()
                .insert()
                .into(Author)
                .values({ ...request.body })
                .execute()
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        return this.Repository
            .createQueryBuilder()
            .delete()
            .from(Author)
            .where("id = :id", { ...request.params })
            .execute()
    }

}