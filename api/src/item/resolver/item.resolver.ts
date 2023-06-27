import { CurrentUser } from '@app/auth/decorator/user.decorator';
import { CreateItemInput, UpdateItemInput } from '@app/item/dto';
import { Item } from '@app/item/entities';
import { ItemService } from '@app/item/service';
import { User } from '@app/user/schema';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser() user: User,
  ) {
    createItemInput.user = user.id;
    return this.itemService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'item' })
  findAll(@CurrentUser() user: User) {
    return this.itemService.findAll(user);
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.remove(id);
  }
}
