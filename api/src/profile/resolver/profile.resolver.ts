import { CurrentUser } from '@app/auth/decorator/user.decorator';
import { IUserPayload } from '@app/auth/interface';
import { CreateProfileInput } from '@app/profile/dto/create-profile.input';
import { UpdateProfileInput } from '@app/profile/dto/update-profile.input';
import { Profile } from '@app/profile/entities';
import { ProfileService } from '@app/profile/service';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') data: CreateProfileInput,
    @CurrentUser() user: IUserPayload,
  ) {
    data.user = user.sub;
    return this.profileService.create(data);
  }

  @Query(() => Profile, { name: 'profile', nullable: true })
  findOne(@CurrentUser() user: IUserPayload) {
    return this.profileService.findOne(user.sub);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @CurrentUser() user: IUserPayload,
  ) {
    updateProfileInput.user = user.sub;
    return this.profileService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.remove(id);
  }
}
