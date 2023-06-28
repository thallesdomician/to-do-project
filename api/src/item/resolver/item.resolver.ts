import { CurrentUser } from '@app/auth/decorator/user.decorator';
import { IUserPayload } from '@app/auth/interface';
import {
  CreateItemInput,
  FindByDateInput,
  UpdateItemInput,
} from '@app/item/dto';
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
    createItemInput.user = user.sub;
    return this.itemService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'findByDate' })
  findByDate(
    @Args('date') input: FindByDateInput,
    @CurrentUser() userPayload: IUserPayload,
  ) {
    return this.itemService.findAll(input, userPayload);
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @CurrentUser() userPayload: IUserPayload,
  ) {
    return this.itemService.update(
      updateItemInput.id,
      updateItemInput,
      userPayload,
    );
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.remove(id);
  }
}
