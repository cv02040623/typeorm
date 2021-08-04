import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';



@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column({ unique: true })
    @Length(1, 10, { message: '长度限制1~10位' })
    @IsNotEmpty({ message: '角色名称不能为空' })
    name: string;

    @Column({ default: '' })
    desc: string;

    @Column({comment:'创建人'})
    @IsOptional()
    create_main: string;

    @Column({ default: 1 })
    status: Number

    @Column()
    @UpdateDateColumn()
    update_time: Date

    @Column()
    @CreateDateColumn()
    create_time: Date

    @Column({ default: null })
    @IsOptional()
    author_id: string
}
