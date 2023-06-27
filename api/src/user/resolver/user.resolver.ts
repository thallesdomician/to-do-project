import { Public } from '@app/auth/decorator/public.decorator';
import { CreateUserInput, UpdateUserInput } from '@app/user/dto';
import { User } from '@app/user/schema';
import { UserService } from '@app/user/service';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('username', { type: () => String }) username: string) {
    return this.userService.findOne(username);
  }
}
