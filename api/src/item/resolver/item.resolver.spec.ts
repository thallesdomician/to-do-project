import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from '@app/item/service';
import { ItemResolver } from '@app/item/resolver/item.resolver';

describe('ItemResolver', () => {
  let resolver: ItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemResolver, ItemService],
    }).compile();

    resolver = module.get<ItemResolver>(ItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
