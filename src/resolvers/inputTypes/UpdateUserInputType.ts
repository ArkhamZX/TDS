import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '../../entities/User';
import { Comment } from '../../entities/Comment';

@InputType()
export class UpdateUserInputType implements Partial<User> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  username: string;

  @Field()
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  rolname?: string;

  @Field(() => String, { nullable: true })
  profileImage?: string;

  @Field(() => [String], { nullable: true })
  commentsIds?: string[];

  @Field(() => [String], { nullable: true })
  likesIds?: string[];

  @Field(() => [String], { nullable: true })
  postsIds?: string[];

  @Field(() => [String], { nullable: true })
  receivedMessagesIds?: string[];

  @Field(() => [String], { nullable: true })
  sendMessagesIds?: string[];
  
}
