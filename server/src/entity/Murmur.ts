import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  
  @Entity()
  export class Murmur {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    ownerid: number;
  
    @Column()
    @Length(4, 200)
    murmurtext: string;
}