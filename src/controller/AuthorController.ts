import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Author } from "../entity/Author";
import { validate } from 'class-validator';
import { _fobj } from "../utils";

const transformTree = (id, children = [], data = []) => {
    for (let index = 0; index < data.length; index++) {
        if (data[index]['pid'] == id) {
            data[index]['children'] = [];
            children.push(data[index]);
            transformTree(data[index]['id'], data[index]['children'], data)
        }
    }
}

export class AuthorController {

    private Repository = getRepository(Author);

    async all(request: Request, response: Response, next: NextFunction) {
        let pam = this.Repository.create(request.query);
        let sql = _fobj(pam as Object);
        let r = await getRepository(Author)
            .createQueryBuilder('author')
            .where(sql)
            .getMany();
        //递归处理数据
        let newTree = [];
        transformTree(0, newTree, r);
        return {
            msg: '成功',
            code: 200,
            data: newTree || []
        }
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
        let sql = _fobj(author)
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
                .values({ ...sql })
                .execute()
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let r = await this.Repository.find({ pid: request.params.id });
        if (r && r.length != 0) {
            return {
                code: -1,
                msg: '当前权限存在子集'
            }
        } else {
            return this.Repository
                .createQueryBuilder()
                .delete()
                .from(Author)
                .where("id = :id", { ...request.params })
                .execute()
        }
    }

}