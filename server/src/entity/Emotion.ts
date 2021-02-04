import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  
  @Entity()
  export class Emotion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    emotiontext: string;
}