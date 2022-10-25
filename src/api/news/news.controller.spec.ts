import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

describe('NewsController', () => {
  let controller: NewsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [NewsService],
    }).compile();

    controller = app.get<NewsController>(NewsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getPosts()).toBe('Hello World!');
    });
  });
});
