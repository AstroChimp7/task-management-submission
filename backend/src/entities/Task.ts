import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "./User";

@Entity("tasks")
export class Task{
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    @IsNotEmpty()
    title!: string;

    @Column({ nullable:true })
    description!: string;

    @Column({default: false })
    isComplete!: boolean;

    @ManyToOne(()=> User, user=> user.tasks)
    user!: User;

    @Column()
    userId!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}