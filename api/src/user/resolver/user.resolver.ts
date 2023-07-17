import { Public } from '@app/auth/decorator/public.decorator';
import { CurrentUser } from '@app/auth/decorator/user.decorator';
import { Login } from '@app/auth/schema';
import { CreateUserInput } from '@app/user/dto';
import { User } from '@app/user/schema';
import { UserService } from '@app/user/service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Mutation(() => Login)
  register(@Args('register') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('username', { type: () => String }) username: string) {
    return this.userService.findOne(username);
  }

  @Query(() => User, { name: 'currentUser', nullable: true })
  currentUser(@CurrentUser() user: User) {
    return this.userService.findOne(user.username);
  }
}
