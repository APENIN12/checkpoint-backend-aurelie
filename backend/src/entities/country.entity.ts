import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export default class Country {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ length: 50 })
  code: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  emoji: string;

}






