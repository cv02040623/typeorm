import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, IsNotEmpty, IsOptional } from 'class-validator';



@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column({ default: true })
    @IsNotEmpty({ message: '父级权限不能为空' })
    pid: number;

    @Column({ unique: true })
    @Length(1, 10, { message: '长度限制1~10位' })
    @IsNotEmpty({ message: '权限名称不能为空' })
    name: string;

    @Column({ unique: true })
    @IsNotEmpty({ message: '前端展示不能为空' })
    path: string;

    @Column({ default: '' })
    icon: string;

    @Column({ default: 1, comment: '展现方式' })
    showtype: Number;

    @Column({ default: 1000 })
    sort: number;

    @Column()
    @UpdateDateColumn()
    update_time: Date

    @Column()
    @CreateDateColumn()
    create_time: Date
}
