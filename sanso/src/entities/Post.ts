import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Vote } from "./Vote";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => Int) // set specific graphql data type
  @PrimaryGeneratedColumn()
  id!: number; // required

  @Field()
  @Column()
  title!: string; //required

  @Field()
  @Column()
  text!: string; //required

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number; //required

  @Field(() => Int, { nullable: true })
  voteStatus: number | null;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
