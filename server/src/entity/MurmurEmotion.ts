import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  
  @Entity()
  export class MurmurEmotion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    murmurid: number;
  
    @Column()
    emotionid: number;
  
    @Column()
    istrue: boolean;
}