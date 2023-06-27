import { Public } from '@app/auth/decorator/public.decorator';
import { LoginAuthInput, RefreshTokenAuthInput } from '@app/auth/dto';
import { Login } from '@app/auth/schema/login.schema';
import { AuthService } from '@app/auth/service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Login, { nullable: true })
  login(@Args('login') loginInput: LoginAuthInput): Promise<Login> {
    return this.authService.login(loginInput);
  }

  @Public()
  @Mutation(() => Login)
  refreshToken(@Args('login') refreshTokenInput: RefreshTokenAuthInput) {
    return this.authService.refreshToken(refreshTokenInput);
  }
}
