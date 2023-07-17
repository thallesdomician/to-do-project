import { CurrentUser } from '@app/auth/decorator/user.decorator';
import { IUserPayload } from '@app/auth/interface';
import { CreateItemInput, UpdateItemInput } from '@app/item/dto';
import { Item } from '@app/item/entities';
import { ItemService } from '@app/item/service';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser() user: IUserPayload,
  ) {
    return this.itemService.create(createItemInput, user);
  }

  @Query(() => Item, { name: 'item' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: IUserPayload,
  ) {
    return this.itemService.findOne(id, user);
  }

  @Mutation(() => Item)
  updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @CurrentUser() user: IUserPayload,
  ) {
    return this.itemService.update(updateItemInput.id, updateItemInput, user);
  }

  @Mutation(() => Item)
  removeItem(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: IUserPayload,
  ) {
    return this.itemService.remove(id, user);
  }
}
