import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

// create both graphql schema (using type-graphql decorators)
// and mikro-orm entities (using mikro-orm decorators)

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number; // required

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text", unique: true })
  username!: string; // required

  @Property({ type: "text" })
  password!: string; // required

  @Field(() => String)
  @Property({ type: "text", unique: true })
  email!: string; // required
}
