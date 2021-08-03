import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';



@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column({ unique: true })
    @Length(1, 10, { message: '长度限制1~10位' })
    @IsNotEmpty({ message: '用户名称不能为空' })
    username: string;

    @Column({ unique: true })
    @IsNotEmpty({ message: '账号不能为空' })
    account: string;

    @Column({ default: '123456' })
    password: string;

    @Column({ default: 1 })
    status: Number

    @Column()
    @IsNotEmpty({ message: '联系方式不能为空' })
    @Length(11, 11, { message: '联系方式为11位' })
    phone: string

    @Column({ default: 1 })
    sex: number

    @Column({ default: '' })
    @IsOptional()
    @MaxLength(100, { message: '备注限制100字符' })
    remark: string

    @Column({ default: '' })
    @IsOptional()
    @MaxLength(100, { message: '地址限制100字符' })
    address: string

    @Column()
    @UpdateDateColumn()
    update_time: Date

    @Column()
    @CreateDateColumn()
    create_time: Date

    @Column({ default: null })
    @IsOptional()
    role_id: string
}
