import { Field, InputType } from "type-graphql";

// input type used to pass options to resolver functions
@InputType()
export class UsernamePasswordInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
  @Field()
  email!: string;
}
