import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  
  @Entity()
  export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    followerid: number;
  
    @Column()
    followedid: number;
}