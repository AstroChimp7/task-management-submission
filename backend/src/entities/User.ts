import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, MinLength } from "class-validator";
import { Task } from "./Task"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true})
    @IsNotEmpty()
    @MinLength(3)
    username!: string;

    @Column()
    @IsNotEmpty()
    @MinLength(6)
    password!: string;

    @OneToMany(()=> Task, task=> task.user)
    tasks!: Task[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}